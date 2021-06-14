import { atom, useRecoilValue, useSetRecoilState } from "recoil";


interface MenuPosition {
  x: number
  y: number
}


const showMenu = atom<boolean>({
  key: "showMenu",
  default: false,
});

const showUseOption = atom<boolean>({
  key: "showUseOption",
  default: false,
});

const menuPosition = atom<MenuPosition>({
  key: "menuPosition",
  default: {x: 0, y:0},
});

export const useIsShowMenu = () => useRecoilValue(showMenu);

export const useSetShowMenu = () => useSetRecoilState(showMenu);

export const useIsShowUseOption = () => useRecoilValue(showUseOption);

export const useSetShowUseOption = () => useSetRecoilState(showUseOption);

export const useMenuPosition = () => useRecoilValue(menuPosition);

export const useSetMenuPosition = () => useSetRecoilState(menuPosition);
