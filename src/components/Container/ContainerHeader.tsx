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
    height: '45px',
    color: theme.inventory.textColor,
  },

  leftInfo: {

  },

  rightInfo: {
    textAlign: 'right',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    gridColumnGap: '30px',
    fontSize: '0.85rem'
  },

  secondaryColor: {
    color: theme.inventory.secondaryTextColor,
    textTransform: 'capitalize'
  },
  containerId: {
    fontSize: '0.65rem',
    marginTop: '2px'
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
