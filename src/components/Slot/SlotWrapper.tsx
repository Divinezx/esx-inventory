import React from "react";
import { Slot, EmptySlot, HotbarSlot, EmptyHotbarSlot } from "./Slot";
import { makeStyles, Theme } from "@material-ui/core";
import { IItem } from "../../state/container.state";

interface Props {
  slots: number
  inventory:  {[key: number]: IItem}
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



const SlotWrapper: React.FC<Props> = ({slots, inventory}) => {

  const classes = useStyles();

  const inventorySlots:JSX.Element[] = []
  for (let i=1; i <= 5; i++) {
    if (inventory != null && inventory[i] != null) {
      inventorySlots.push(<HotbarSlot key={i} item={inventory[i]} slotNumber={i}/>)
    } else {
      inventorySlots.push(<EmptyHotbarSlot key={i} slotNumber={i}/>)
    }
  }
  for (let i=6; i <= slots; i++) {
    if (inventory != null && inventory[i] != null) {
      inventorySlots.push(<Slot key={i} item={inventory[i]}/>)
    } else {
      inventorySlots.push(<EmptySlot key={i}/>)
    }
  }


  return  (
    <div className={classes.slotsWrapper} >
      {inventorySlots}
    </div>
  );
}

export default SlotWrapper;
