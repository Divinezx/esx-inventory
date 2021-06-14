import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export enum ContainerType {
  PLAYER = "player",
  BOX = "box",
  TRUNK = "trunk"
}

export enum SlotType {
  NORMAL = "normal",
  HOTBAR = "hotbar"
}

export interface IItem {
  slotType: SlotType,
  itemType: string,
  label: string,
  amount: number,
  weight: number,
  usable: boolean,
  metadata: {[key: string]: any}
};

export interface IContainer {
  id: number,
  slots: number,
  type: ContainerType,
  maxCapacity: number,
  maxWeight: number,
  currentCapacity: number,
  currentWeight: number,
  inventory:  {[key: number]: IItem}
}




export enum ContainerStateType {
  PRIMARY = "primary",
  SECONDARY = "secondary"
}

const containersState = {
  primaryContainer: atom<IContainer | null>({
    default: null,
    key: "primaryContainer"
  }),
  secondaryContainer: atom<IContainer | null>({
    default: null,
    key: "secondaryContainer"
  }),
};

export const usePrimaryContainerState = () => useRecoilValue(containersState.primaryContainer);

export const useSetPrimaryContainerState = () => useSetRecoilState(containersState.primaryContainer);

export const useSecondaryContainerState = () => useRecoilValue(containersState.secondaryContainer);

export const useSetSecondaryContainerState = () => useSetRecoilState(containersState.secondaryContainer);
