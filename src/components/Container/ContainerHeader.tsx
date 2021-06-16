import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { ContainerType } from "../../state/container.state";

interface Props {
  id: number,
  type: ContainerType,
  maxCapacity: number,
  maxWeight: number,
  currentCapacity: number,
  currentWeight: number,
}

const useStyles = makeStyles( (theme:Theme) => ({
  containerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '5%',
    color: theme.inventory.textColor,
    marginBottom: '1%'
  },

  leftInfo: {
    [theme.breakpoints.up('720p')]: {
      fontSize: '0.65rem',
    },
    [theme.breakpoints.up('1080p')]: {
      fontSize: '0.85rem',
    },
    [theme.breakpoints.up('1440p')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.up('2160p')]: {
      fontSize: '1.4rem',
    },
  },

  rightInfo: {
    textAlign: 'right',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    gridColumnGap: '30px',
    fontSize: '0.85rem',
    [theme.breakpoints.up('720p')]: {
      fontSize: '0.65rem',
    },
    [theme.breakpoints.up('1080p')]: {
      fontSize: '0.85rem',
    },
    [theme.breakpoints.up('1440p')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.up('2160p')]: {
      fontSize: '1.4rem',
    },
  },

  secondaryColor: {
    color: theme.inventory.secondaryTextColor,
    textTransform: 'capitalize'
  },
  containerId: {
    fontSize: '0.65rem',
    marginTop: '2px',
    [theme.breakpoints.up('720p')]: {
      fontSize: '0.45rem',
    },
    [theme.breakpoints.up('1080p')]: {
      fontSize: '0.65rem',
    },
    [theme.breakpoints.up('1440p')]: {
      fontSize: '0.9rem',
    },
    [theme.breakpoints.up('2160p')]: {
      fontSize: '1.1rem',
    },
  }
}));



const ContainerHeader: React.FC<Props> = ({
  id,
  type,
  maxCapacity,
  maxWeight,
  currentCapacity,
  currentWeight,
}) => {

  const classes = useStyles();

  return  (
    <div className={classes.containerHeader} >
      <div className={classes.leftInfo}>
        <div className={classes.secondaryColor}>{type}</div>
        <div className={classes.containerId}>{id}</div>
      </div>
      <div className={classes.rightInfo}>
        <div >Capacity:</div>
        <div className={classes.secondaryColor} >{currentCapacity} / {maxCapacity}</div>
        <div >Weight:</div>
        <div className={classes.secondaryColor}>{currentWeight.toFixed(2)} / {maxWeight.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default ContainerHeader;
