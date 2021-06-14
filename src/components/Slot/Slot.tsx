import React, { useRef, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { IItem, SlotType } from "../../state/container.state";
import { Item } from "./Item";
import { useItemDrag, useSetItemDrag } from "../../state/dragItem.state";
import { usePreviewDrag } from "../../hooks/usePreviewDrag";

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
  const slotRef = useRef();
  const [slotItem, setSlotItem] = useState<IItem>(item);
  const { createPreview, removePreview } = usePreviewDrag();
  const [itemDragInfo, setItemDragInfo] = [useItemDrag(), useSetItemDrag()];

  const handleOnDragStart = (e) => {
    if (!slotItem) { e.preventDefault(); return }

    const { x , y, width, height } = slotRef.current.getBoundingClientRect();
    const moveItem = {...slotItem, amount: 2};
    e.dataTransfer.setDragImage(createPreview(moveItem, width, height), e.clientX - x, e.clientY - y);
    setItemDragInfo({slotItem: slotItem, setSlotItem: setSlotItem, slotNumber: slotNumber, containerId: containerId, moveItem: moveItem});
    slotRef.current.style.opacity = 0.4;
  }

  const handleOnDragEnd = (e) => {

    slotRef.current.style.opacity = 1;
    removePreview();
  }

  const handleOnDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handleOnDrop = (e) => {
    e.preventDefault();
    if(itemDragInfo === null) return;

    slotRef.current.classList.remove(classes.over);

    const fromSlotItem = itemDragInfo.slotItem;
    const fromSetSlotItem = itemDragInfo.setSlotItem;
    const fromSlotNumber = itemDragInfo.slotNumber;
    const fromContainerId = itemDragInfo.containerId;
    const moveItem = itemDragInfo.moveItem;

    if (slotItem && slotItem.label !== moveItem.label) return;
    if (slotNumber === fromSlotNumber) return;

    // Update fromSlot
    const remainingAmount = fromSlotItem.amount - moveItem.amount;
    if (remainingAmount === 0) {
      fromSetSlotItem(null);
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
    slotRef.current.classList.add(classes.over);
  }

  const handleOnDragLeave = (e) => {
    slotRef.current.classList.remove(classes.over);
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
    >
      { hotbar ? <div className={classes.hotbarSlotNumber}>{slotNumber}</div> : undefined }
      { slotItem ? <Item item={slotItem} setSlotItem={setSlotItem} slotNumber={slotNumber} /> : undefined }
    </div>
  );
}
