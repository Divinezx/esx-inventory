import React, { useRef, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { IItem } from "../../state/container.state";
import { Item } from "./Item";
import { useItemDrag, useSetItemDrag } from "../../state/dragItem.state";
import { usePreviewDrag } from "../../hooks/usePreviewDrag";
import { useIsShowMenu, useSetMenuPosition, useSetShowMenu, useSetShowUseOption } from "../../state/contextMenu.state";

interface SlotProps {
  slotNumber: number
  containerId: number
  hotbar?: boolean
  item?: IItem
}

const useStyles = makeStyles( (theme:Theme) => ({
  slot: {
    position: 'relative',
    border: `1px solid ${theme.inventory.borderColor}`,
    borderRadius: '5px',
    color: theme.inventory.textColor,
    "& *": {
      pointerEvents: 'none'
    }
  },
  hotbarSlotNumber: {
    position: 'absolute',
    width: '15px',
    textAlign: 'center',
    borderRight: `1px groove ${theme.inventory.borderColor}`,
    borderBottom: `1px groove ${theme.inventory.borderColor}`,
    borderRadius: '0px 0px 4px',
    fontSize: '0.85rem'
  },
  over: {
    border: '2px dashed #666'
  }
}));


export const Slot: React.FC<SlotProps> = ({slotNumber, containerId, hotbar, item}) => {

  const classes = useStyles();
  const slotRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [slotItem, setSlotItem] = useState<IItem | undefined>(item);
  const { createPreview, removePreview } = usePreviewDrag();
  const [itemDragInfo, setItemDragInfo] = [useItemDrag(), useSetItemDrag()];
  const setShowMenu = useSetShowMenu();
  const setShowUse = useSetShowUseOption();
  const setMenuPosition = useSetMenuPosition();
  const isContextMenuVisible = useIsShowMenu();

  const handleOnDragStart = (e) => {
    if (!slotItem) { e.preventDefault(); return }

    const { x , y, width, height } = slotRef.current!.getBoundingClientRect();
    let amountToMove = slotItem.amount;
    if (e.shiftKey) {
      amountToMove = 0;
    }
    if (e.ctrlKey) {
      amountToMove = 1;
    }

    const moveItem = {...slotItem, amount: amountToMove};
    e.dataTransfer.setDragImage(createPreview(moveItem, width, height), e.clientX - x, e.clientY - y);
    setItemDragInfo({slotItem: slotItem, setSlotItem: setSlotItem, slotNumber: slotNumber, containerId: containerId, moveItem: moveItem});
    slotRef.current!.style.opacity = '0.4';
  }

  const handleOnDragEnd = (e) => {

    slotRef.current!.style.opacity = '1';
    removePreview();
  }

  const handleOnDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handleOnDrop = (e) => {
    e.preventDefault();
    if(itemDragInfo === null) return;

    slotRef.current!.classList.remove(classes.over);

    const fromSlotItem = itemDragInfo.slotItem;
    const fromSetSlotItem = itemDragInfo.setSlotItem;
    const fromSlotNumber = itemDragInfo.slotNumber;
    const fromContainerId = itemDragInfo.containerId;
    let moveItem = itemDragInfo.moveItem;

    if (slotItem && slotItem.label !== moveItem.label) return;
    if (slotNumber === fromSlotNumber) return;

    //NUICallBack

    //if succeed



    if (moveItem.amount === 0) {
      //ask for amount
      const amount = window.prompt("Enter the amount: ");
      if (amount === null || amount === "") return;
      if (parseInt(amount) >= fromSlotItem.amount) {
        console.log("Amount exceed current item amount.");
        return;
      }
      if (parseInt(amount) <= 0) {
        console.log("Amount should be a positive number.");
        return;
      }
      moveItem = {...moveItem, amount: parseInt(amount)}
    }

    // Update fromSlot
    const remainingAmount = fromSlotItem.amount - moveItem.amount;
    if (remainingAmount === 0) {
      fromSetSlotItem(undefined);
    } else {
      fromSetSlotItem({...moveItem, amount: remainingAmount});
    }

    // Update toSlot
    if (slotItem) {
      setSlotItem({...slotItem, amount: slotItem.amount + moveItem.amount})
    } else {
      setSlotItem(moveItem);
    }



  }

  const handleOnDragEnter = (e) => {
    slotRef.current!.classList.add(classes.over);
  }

  const handleOnDragLeave = (e) => {
    slotRef.current!.classList.remove(classes.over);
  }

  const handleOnContextMenu = (e) => {
    if (!slotItem) return;

    setShowUse(slotItem.usable);
    setMenuPosition({x: e.clientX, y: e.clientY});
    setShowMenu(true);
  }

  const handleOnClick = (e) => {
    isContextMenuVisible && setShowMenu(false);
  }

  const handleOnDoubleClick = (e) => {
    console.log("USE/EQUIP");
  }


  return  (
    <div draggable
      ref={slotRef}
      className={classes.slot}
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      onContextMenu={handleOnContextMenu}
      onClick={handleOnClick}
      onDoubleClick={handleOnDoubleClick}
    >
      { hotbar ? <div className={classes.hotbarSlotNumber}>{slotNumber}</div> : undefined }
      { slotItem ? <Item item={slotItem} /> : undefined }
    </div>
  );
}
