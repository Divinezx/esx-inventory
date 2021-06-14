import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { ContainerStateType, usePrimaryContainerState, useSecondaryContainerState, useSetPrimaryContainerState, useSetSecondaryContainerState } from "../state/container.state";
import Container from "./Container/Container";

const useStyles = makeStyles( (theme:Theme) => ({
  inventoryRoot: {
    width: '60%',
    height: '75%',
    padding: '1%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));


const InventoryRoot: React.FC = () => {

  const classes = useStyles();
  const primaryContainerState = usePrimaryContainerState();
  const secondaryContainerState = useSecondaryContainerState();


  return (
    <div className={classes.inventoryRoot}>
      {(primaryContainerState != null) ? <Container container={primaryContainerState} containerType={ContainerStateType.PRIMARY} /> : undefined}
      {(secondaryContainerState != null) ? <Container container={secondaryContainerState} containerType={ContainerStateType.SECONDARY} /> : undefined}
    </div>
  );
}

export default InventoryRoot;
