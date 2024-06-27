import { create } from 'zustand'
import { PostDisplayType } from '../services/post-service/types'

export type PostState = {
  content: PostDisplayType | null // 얘는 어디 쓰더라?
  setContent: (content: PostDisplayType | null) => void
}

export const usePostStore = create<PostState>((set) => ({
  content: null,
  setContent: (by) => {
    set((state) => ({ ...state, content: by }))
  },
}))
