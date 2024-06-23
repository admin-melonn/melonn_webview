import { create } from 'zustand'

export type UserState = {
  userId: string
  email: string
  name: string
  imgUrl: string
  setUserId: (userId: string) => void
  setEmail: (email: string) => void
  setName: (name: string) => void
  setImgUrl: (imgUrl: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  userId: '',
  email: '',
  name: '',
  imgUrl: '',
  setUserId: (by) => {
    set((state) => ({ ...state, userId: by }))
  },
  setEmail: (by) => {
    set((state) => ({ ...state, email: by }))
  },
  setName: (by) => {
    set((state) => ({ ...state, name: by }))
  },
  setImgUrl: (by) => {
    set((state) => ({ ...state, imgUrl: by }))
  },
}))
