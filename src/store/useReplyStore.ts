import { create } from 'zustand'

type parentInfo = {
  profileUrl: string
  name: string
  content: string
  createdAt: string
  postId: string
  userId: string
  conversation?: {
    commenterType: 'user' | 'assistant'
    content: string
  }[]
}

export type ReplyState = {
  parent: parentInfo | null
  setParent: (parent: parentInfo) => void
}

export const useReplyStore = create<ReplyState>((set) => ({
  parent: null,
  setParent: (by) => {
    set((state) => ({ ...state, parent: by }))
  },
}))
