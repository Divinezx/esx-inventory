import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { IItem, SlotType } from "../../state/container.state";

interface EmptyHotbarProps {
  slotNumber: number
}

interface HotbarProps {
  item: IItem
  slotNumber: number
}

interface Props {
  item: IItem
}

const useStyles = makeStyles( (theme:Theme) => ({
  slot: {
    position: 'relative',
    border: `1px solid ${theme.inventory.borderColor}`,
    borderRadius: '5px',
    color: theme.inventory.textColor
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
  itemInfo: {
    position: 'absolute',
    right: '3px',
    textAlign: 'right'
  },

  itemLabel: {
    position: 'absolute',
    width: '100%',
    borderTop: `1px solid ${theme.inventory.borderColor}`,
    bottom: '0',
    textAlign: 'center',
    fontSize: '0.85rem',
    fontWeight: 600,
    backgroundColor: theme.inventory.hoverColor,
    textTransform: 'capitalize',
  },
  itemAmount: {
    fontSize: '0.85rem',
    color: theme.inventory.secondaryTextColor
  },
  itemWeight: {
    fontSize: '0.65rem',
  },
  itemImage: {
    position: 'absolute',
    width: 'auto',
    height: '75%',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto'
  }
}));

export const EmptySlot: React.FC = () => {

  const classes = useStyles();

  return  (
    <div className={classes.slot} >

    </div>
  );
}

export const Slot: React.FC<Props> = ({item}) => {

  const classes = useStyles();

  console.log(item.slotType === SlotType.NORMAL);

  return  (
    <div className={classes.slot} >
      <div className={classes.itemInfo}>
        <div className={classes.itemAmount}>{item.amount}</div>
        <div className={classes.itemWeight}>{item.weight}</div>
      </div>
      <img className={classes.itemImage} src={`images/${item.label}.png`} alt="Item"/>
      <div className={classes.itemLabel}>{item.label}</div>
    </div>
  );
}


export const EmptyHotbarSlot: React.FC<EmptyHotbarProps> = ({slotNumber}) => {

  const classes = useStyles();

  return  (
    <div className={classes.slot} >
      <div className={classes.hotbarSlotNumber}>{slotNumber}</div>
    </div>
  );
}

export const HotbarSlot: React.FC<HotbarProps> = ({item, slotNumber}) => {

  const classes = useStyles();

  console.log(item.slotType === SlotType.NORMAL);

  return  (
    <div className={classes.slot} >
      <div className={classes.hotbarSlotNumber}>{slotNumber}</div>
      <div className={classes.itemInfo}>
        <div className={classes.itemAmount}>{item.amount}</div>
        <div className={classes.itemWeight}>{item.weight}</div>
      </div>
      <img className={classes.itemImage} src={`images/${item.label}.png`} alt="Item"/>
      <div className={classes.itemLabel}>{item.label}</div>
    </div>
  );
}
