import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { IItem } from "../../state/container.state";

interface ItemProps {
  item: IItem
}

export const useStyles = makeStyles( (theme:Theme) => ({
  item: {
    width: '100%',
    height: '100%'
  },
  itemInfo: {
    position: 'absolute',
    right: '3%',
    textAlign: 'right',
    top: '1.5%'
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
    paddingBlock: '1px',
    color: theme.inventory.textColor,
    [theme.breakpoints.up('720p')]: {
      fontSize: '0.65rem',
    },
    [theme.breakpoints.up('1080p')]: {
      fontSize: '0.85rem',
    },
    [theme.breakpoints.up('1440p')]: {
      fontSize: '1.15rem',
    },
    [theme.breakpoints.up('2160p')]: {
      fontSize: '1.5rem',
    },
  },
  itemAmount: {
    fontSize: '0.85rem',
    color: theme.inventory.secondaryTextColor,
    [theme.breakpoints.up('720p')]: {
      fontSize: '0.65rem',
    },
    [theme.breakpoints.up('1080p')]: {
      fontSize: '0.85rem',
    },
    [theme.breakpoints.up('1440p')]: {
      fontSize: '1.15rem',
    },
    [theme.breakpoints.up('2160p')]: {
      fontSize: '1.5rem',
    },
  },
  itemWeight: {
    fontSize: '0.65rem',
    [theme.breakpoints.up('720p')]: {
      fontSize: '0.50rem',
    },
    [theme.breakpoints.up('1080p')]: {
      fontSize: '0.65rem',
    },
    [theme.breakpoints.up('1440p')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('2160p')]: {
      fontSize: '1.15rem',
    },
  },
  itemImage: {
    position: 'absolute',
    width: '90%',
    height: 'auto',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    userDrag: 'none'
  }
}));


export const Item: React.FC<ItemProps> = ({item}) => {

  const classes = useStyles();

  const stackedAmount = item.weight * item.amount
  const toFixedAmount = Math.round(stackedAmount*100)/100;

  return  (
    <div className={classes.item}>
      <div className={classes.itemInfo}>
        <div className={classes.itemAmount} id={'itemAmount'}>{item.amount}</div>
        <div className={classes.itemWeight} id={'itemWeight'}>{toFixedAmount}</div>
      </div>
      <img className={classes.itemImage} src={`images/${item.label}.png`} alt="Item"/>
      <div className={classes.itemLabel}>{item.label}</div>
    </div>
  );
}
