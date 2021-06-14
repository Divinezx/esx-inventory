import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { IItem } from "./container.state";

interface ItemDragInfo {
  slotItem: IItem
  setSlotItem: any
  slotNumber: number
  containerId: number
  moveItem: IItem
}

const itemDragInfo = atom<ItemDragInfo | null>({
  key: "itemDragInfo",
  default: null,
});

export const useItemDrag = () => useRecoilValue(itemDragInfo);

export const useSetItemDrag = () => useSetRecoilState(itemDragInfo);
