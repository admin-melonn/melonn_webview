import React, { useCallback, useRef } from 'react'
import SnackbarUI, {
  SnackbarHideParams,
  SnackbarShowParams,
} from './SnackBarUI'

type SnackbarRef = {
  show: (params: SnackbarShowParams) => void
  hide: () => void
}

type SnackbarRefObj = {
  current: SnackbarRef | null
}

let refs: SnackbarRefObj[] = []

const Snackbar = () => {
  const snackbarRef = useRef<SnackbarRef | null>(null)

  const addNewRef = (ref: SnackbarRef): void => {
    refs.push({
      current: ref,
    })
  }

  const removeOldRef = (oldRef: SnackbarRef | null) => {
    refs = refs.filter((r) => r.current !== oldRef)
  }

  const setRef = useCallback((ref: SnackbarRef | null) => {
    if (ref) {
      snackbarRef.current = ref
      addNewRef(ref)
    } else {
      // remove the this toast's ref, wherever it is in the array.
      removeOldRef(snackbarRef.current)
    }
  }, [])

  return <SnackbarUI ref={setRef} />
}

const getRef = (): SnackbarRef | null => {
  const reversePriority = [...refs].reverse()
  const activeRef = reversePriority.find((ref) => ref?.current !== null)
  if (!activeRef) {
    return null
  }
  return activeRef.current
}

Snackbar.show = (params: SnackbarShowParams) => {
  const ref = getRef()
  if (ref) {
    ref.show(params)
  }
}

Snackbar.hide = () => {
  const ref = getRef()
  if (ref) {
    ref.hide()
  }
}

export default Snackbar
