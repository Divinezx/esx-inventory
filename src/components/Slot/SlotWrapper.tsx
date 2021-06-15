import React from "react";
import { Slot } from "./Slot";
import { makeStyles, Theme } from "@material-ui/core";
import { ContainerStateType, IItem } from "../../state/container.state";

interface Props {
  slots: number
  inventory:  {[key: number]: IItem}
  containerType: ContainerStateType
  containerId: number
};

const useStyles = makeStyles( (theme:Theme) => ({
  slotsWrapper: {
    display: 'grid',
    height: 'calc(100% - 65px)',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
    gridAutoRows: '110px',
    gridGap: '5px',
    overflowY: 'auto',
    overflowX: 'hidden',
  }
}));

const HOTBAR_SLOTS = 5;

const setPrimarySlots = (slots: number, inventory:{[key: number]: IItem}, containerId:number) => {
  const inventorySlots:JSX.Element[] = []

  for (let i=1; i <= HOTBAR_SLOTS && i <= slots; i++) {
    if (inventory && inventory[i]) {
      inventorySlots.push(<Slot key={i} slotNumber={i} item={inventory[i]} containerId={containerId} hotbar/>)
    } else {
      inventorySlots.push(<Slot key={i} slotNumber={i} containerId={containerId} hotbar/>)
    }
  }

  for (let i=6; i <= slots; i++) {
    if (inventory && inventory[i]) {
      inventorySlots.push(<Slot key={i} slotNumber={i} item={inventory[i]} containerId={containerId}/>)
    } else {
      inventorySlots.push(<Slot key={i} slotNumber={i} containerId={containerId}/>)
    }
  }

  return inventorySlots;
};

const setSecondarySlots = (slots: number, inventory:{[key: number]: IItem}, containerId:number) => {
  const inventorySlots:JSX.Element[] = []

  for (let i=1; i <= slots; i++) {
    if (inventory && inventory[i]) {
      inventorySlots.push(<Slot key={i} slotNumber={i} item={inventory[i]} containerId={containerId}/>)
    } else {
      inventorySlots.push(<Slot key={i} slotNumber={i} containerId={containerId}/>)
    }
  }

  return inventorySlots;
}



const SlotWrapper: React.FC<Props> = ({slots, inventory, containerType, containerId}) => {

  const classes = useStyles();

  let inventorySlots:JSX.Element[] = []

  if (containerType === ContainerStateType.PRIMARY) {
    inventorySlots = setPrimarySlots(slots, inventory, containerId);
  } else if (containerType === ContainerStateType.SECONDARY) {
    inventorySlots = setSecondarySlots(slots,inventory, containerId);
  }


  return  (
    <div className={classes.slotsWrapper} >
      {inventorySlots}
    </div>
  );
}

export default SlotWrapper;
