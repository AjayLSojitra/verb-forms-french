import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

export type ConfettiState = {
  value: boolean;
  mode: "small" | "large";
};

const confettiState = atom<ConfettiState>({
  key: "confettiState",
  default: {
    value: false,
    mode: "large",
  },
});

export const useConfettiStateValue = () => useRecoilValue(confettiState);
export const useConfettiState = () => useRecoilState(confettiState);
export const useSetConfettiState = () => useSetRecoilState(confettiState);
export const useResetConfettiState = () => useResetRecoilState(confettiState);