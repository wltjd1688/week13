import { atom, selector } from "recoil";

export const TokenAtom = atom({
  key: 'TokenAtom',
  default: null,
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({get})=>!!get(TokenAtom),
});