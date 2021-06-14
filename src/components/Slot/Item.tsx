import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { IItem } from "../../state/container.state";

interface ItemProps {
  item: IItem
  setSlotItem: any
  slotNumber: number
}

export const useStyles = makeStyles( (theme:Theme) => ({
  item: {
    width: '100%',
    height: '100%'
  },
  itemInfo: {
    position: 'absolute',
    right: '3px',
    textAlign: 'right',
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
    margin: 'auto',
    userDrag: 'none'
  }
}));


export const Item: React.FC<ItemProps> = ({item, setSlotItem, slotNumber}) => {

  const classes = useStyles();

  return  (
    <div className={classes.item}>
      <div className={classes.itemInfo}>
        <div className={classes.itemAmount} id={'itemAmount'}>{item.amount}</div>
        <div className={classes.itemWeight} id={'itemWeight'}>{item.weight}</div>
      </div>
      <img className={classes.itemImage} src={`images/${item.label}.png`} alt="Item"/>
      <div className={classes.itemLabel}>{item.label}</div>
    </div>
  );
}
