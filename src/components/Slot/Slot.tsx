import React, { useRef, useState, useEffect } from "react";
import { makeStyles, Theme, Tooltip, Typography, withStyles } from "@material-ui/core";
import { IItem } from "../../state/container.state";
import { Item } from "./Item";
import { useItemDrag, useSetItemDrag } from "../../state/dragItem.state";
import { usePreviewDrag } from "../../hooks/usePreviewDrag";
import {  useSetMenuPosition, useSetShowMenu, useSetShowUseOption } from "../../state/contextMenu.state";
import { useDialogContext } from "../../providers/DialogProvider";
import $ from 'jquery';
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import { useStylesSlotWrapper } from "./SlotWrapper";

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
    zIndex: 98,
    opacity: 1,
    "&$slot:hover": {
      border: `1px solid ${theme.inventory.textColor}`,
      borderWidth: '2px',
      opacity: 0.75,
    },
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
    fontSize: '0.85rem',
    [theme.breakpoints.up('720p')]: {
      fontSize: '0.65rem',
      width: '12.5px',
    },
    [theme.breakpoints.up('1080p')]: {
      fontSize: '0.85rem',
      width: '15px',
    },
    [theme.breakpoints.up('1440p')]: {
      fontSize: '1.25rem',
      width: '20px',
    },
    [theme.breakpoints.up('2160p')]: {
      fontSize: '1.5rem',
      width: '25px',
    },
  },
  beingDragged: {
    opacity: 0.5,
  },
  metadataItem: {
    textTransform: 'capitalize',
    display: 'flex',
  },
  metadataDescription: {
    fontSize: theme.typography.pxToRem(10),
    marginBottom: '5px',
  },
  separator: {
    marginBlock: '5px 5px',
    height: '1px',
    border: '0',
    borderTop: `1px solid ${theme.inventory.buttonColor}`,
    padding: '0'
  }
}));

const SlotTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.inventory.backgroundColor,
    color: theme.inventory.textColor,
    maxWidth: 350,
    fontSize: theme.typography.pxToRem(11),
  },
}))(Tooltip);


export const Slot: React.FC<SlotProps> = ({slotNumber, containerId, hotbar, item}) => {

  const classes = useStyles();
  const slotWrapperClasses = useStylesSlotWrapper();
  const slotRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [slotItem, setSlotItem] = useState<IItem | undefined>(item);
  const createPreview = usePreviewDrag();
  const [itemDragInfo, setItemDragInfo] = [useItemDrag(), useSetItemDrag()];
  const setShowMenu = useSetShowMenu();
  const setShowUse = useSetShowUseOption();
  const setMenuPosition = useSetMenuPosition();
  const { openDialog } = useDialogContext();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    if (!slotItem) return;

    setTooltipOpen(true);
  };


  const handleMoveItem = (fromSlotItem, fromSetSlotItem, fromSlotNumber, fromContainerId, moveItem) => {
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

  const handleAskForAmount = (fromSlotItem, fromSetSlotItem, fromSlotNumber, fromContainerId, moveItem) => {
    openDialog({
      title:  "Input the amount",
      placeholder: "Amount",
      type: "number",
      onSubmit: (amount: string) => {
        if(fromSlotItem.amount < parseInt(amount) || parseInt(amount) <= 0) return;
        handleMoveItem(fromSlotItem, fromSetSlotItem, fromSlotNumber, fromContainerId, {...moveItem, amount: parseInt(amount)});
      },
    });
  };


  const handleOnContextMenu = (e) => {
    if (!slotItem) return;

    handleTooltipClose();
    setShowUse(slotItem.usable);
    setMenuPosition({x: e.clientX, y: e.clientY});
    setShowMenu(true);
  }

  const handleOnDoubleClick = (e) => {
    if (!slotItem) return;

    console.log("USE/EQUIP");
  }

  const buildMetadata = (metadata) => {
    let metadataInfo:JSX.Element[] = [];
    for (let info in metadata) {
      if (info === 'description') continue;
      metadataInfo.push((<div key={info} className={classes.metadataItem}><div><b>{info.replace(/_/g, " ")}: </b></div><div style={{marginLeft: '5px'}}>{metadata[info]}</div></div>));
    }
    return metadataInfo;
  }

  const buildTooltip = (item:IItem) => {
    return (<React.Fragment >
      <Typography color="inherit">{item.label}</Typography>
      <hr className={classes.separator}/>
      <div className={classes.metadataDescription}>{item.metadata.description}</div>
      {buildMetadata(item.metadata)}
      <div className={classes.metadataItem}><div><b>{'Individual Weight: ' }</b></div><div style={{marginLeft: '5px'}}>{item.weight}</div></div>
  </React.Fragment>)
  }

  useEffect(() => {
    if (slotItem) {
      $(slotRef.current).draggable({
        stack: classes.slot,
        appendTo: 'body',
        helper: function(e) {
          let amountToMove = slotItem.amount;
          if (e.shiftKey) {
            amountToMove = 0;
          }
          if (e.ctrlKey) {
            amountToMove = 1;
          }

          const { width, height } = slotRef.current!.getBoundingClientRect();
          const moveItem = {...slotItem, amount: amountToMove};
          setItemDragInfo({slotItem: slotItem, setSlotItem: setSlotItem, slotNumber: slotNumber, containerId: containerId, moveItem: moveItem});
          return $(createPreview(moveItem, width, height));
        },
        start: function() {
          slotRef.current.classList.add(classes.beingDragged);
        },
        stop: function() {
          slotRef.current.classList.remove(classes.beingDragged);
        },
      });
    }
    else {
      if ($(slotRef.current).data('ui-draggable')) {
        $(slotRef.current).draggable('destroy');
      }
    }



    $(slotRef.current).droppable({
      drop: function(event, ui) {
        if ( event.clientY > $(slotRef.current).closest(`.${slotWrapperClasses.slotsWrapper}`).offset().top + $(slotRef.current).closest(`.${slotWrapperClasses.slotsWrapper}`).height() || event.clientY < $(slotRef.current).closest(`.${slotWrapperClasses.slotsWrapper}`).offset().top) {
          return;
        }

        if(itemDragInfo === null) return;

        const fromSlotItem = itemDragInfo.slotItem;
        const fromSetSlotItem = itemDragInfo.setSlotItem;
        const fromSlotNumber = itemDragInfo.slotNumber;
        const fromContainerId = itemDragInfo.containerId;
        let moveItem = itemDragInfo.moveItem;


        if (slotNumber === fromSlotNumber) return;

        if (slotItem && slotItem.label !== moveItem.label) {
          if (fromSlotItem.amount === moveItem.amount) {
            fromSetSlotItem(slotItem);
            setSlotItem(moveItem);
          }
          return;
        }

        //NUICallBack

        //if succeed
        if (moveItem.amount === 0) {
          handleAskForAmount(fromSlotItem, fromSetSlotItem, fromSlotNumber, fromContainerId, moveItem);
          return;
        }

        handleMoveItem(fromSlotItem, fromSetSlotItem, fromSlotNumber, fromContainerId, moveItem);
        },
    });
  })


  return  (
    <SlotTooltip
      open={tooltipOpen}
      onClose={handleTooltipClose}
      onOpen={handleTooltipOpen}
      enterDelay={1000}
      enterNextDelay={1000}
      title={slotItem ? buildTooltip(slotItem) : ""}
      disableTouchListener
      disableFocusListener
      placement='right'
    >
      <div
        ref={slotRef}
        className={classes.slot}
        onContextMenu={handleOnContextMenu}
        onDoubleClick={handleOnDoubleClick}
      >
        { hotbar && <div className={classes.hotbarSlotNumber}>{slotNumber}</div> }
        { slotItem && <Item item={slotItem} /> }
      </div>
    </SlotTooltip>
  );
}
