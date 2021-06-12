import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const visibilityState = atom<boolean>({
  key: "inventoryVisibility",
  default: false,
});

export const useIsMenuVisible = () => useRecoilValue(visibilityState);

export const useSetIsMenuVisible = () => useSetRecoilState(visibilityState);
