import { create } from "zustand";

export type SoundState = {
  lastModifiedId: string; // 얘는 어디 쓰더라?
  setPlayingSpace: (playingSpace: string) => void;
};

export const useSoundStore = create<SoundState>((set) => ({
  lastModifiedId: "",
  setPlayingSpace: (by) => {
    set((state) => ({ ...state, playingSpace: by }));
  },
}));
