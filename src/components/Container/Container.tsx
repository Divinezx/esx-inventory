import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import SlotWrapper from "../Slot/SlotWrapper";
import ContainerHeader from "./ContainerHeader";
import { ContainerStateType, IContainer } from "../../state/container.state";



interface Props {
  container: IContainer
  containerType: ContainerStateType
};

const useStyles = makeStyles( (theme:Theme) => ({
  container: {
    position: 'relative',
    minWidth: '290px',
    width: '48%',
    height: '100%',
    float: 'left',
    background: theme.inventory.backgroundColor,
    borderRadius: '15px',
    padding: '15px'
  },

  separator: {
    marginBlock: '5px 10px',
    height: '1px',
    border: '0',
    borderTop: `1px solid ${theme.inventory.buttonColor}`,
    padding: '0'
  }
}));



const Container: React.FC<Props> = ({container, containerType}) => {

  const classes = useStyles();

  return  (
    <div className={classes.container} >
      <ContainerHeader
        id = {container.id}
        type = {container.type}
        maxCapacity = {container.maxCapacity}
        maxWeight = {container.maxWeight}
        currentCapacity = {container.currentCapacity}
        currentWeight = {container.currentWeight}
      />
      <hr className={classes.separator}/>
      <SlotWrapper slots = {container.slots} inventory={container.inventory} containerType={containerType} containerId={container.id}/>
    </div>
  );
}

export default Container;
