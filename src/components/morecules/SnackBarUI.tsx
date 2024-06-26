import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Check, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import Snackbar from './SnackBar'

export type SnackbarShowParams = {
  text: SnackBarTypes
  onClick?: () => void
}

export type SnackbarHideParams = {}

let timeId: any
const SnackbarUI = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const [text, setText] = useState<SnackBarTypes>(SnackBarTypes.POSTING)
  const [func, setFunc] = useState<() => void | undefined>()

  const hideSnackbar = () => {
    setShow(false)
  }

  useImperativeHandle(ref, () => ({
    show: (params: SnackbarShowParams) => {
      if (timeId) {
        setShow(false)
        clearTimeout(timeId)
      }

      setTimeout(() => {
        setText(params.text)
        if (params.onClick) {
          setFunc(() => params.onClick)
        }
        timeId = setTimeout(() => hideSnackbar(), 5000)
        setShow(true)
      }, 100)
    },
    hide: () => setShow(false),
  }))

  return (
    <div
      className='fixed z-50 w-full left-0 top-[3px] opacity-0 p-2 h-[20px] flex justify-center items-start animate-slideTopIn'
      style={{ display: show ? 'flex' : 'none' }}
    >
      <div
        onClick={() => {
          if (text == SnackBarTypes.POSTED && func) {
            func()
            setFunc(undefined)
            Snackbar.hide()
          } else {
            Snackbar.hide()
          }
        }}
        className='p-3 w-full bg-gray-900/95 rounded-[8px] text-[15px] flex flex-row text-white font-medium justify-between'
      >
        <div className='w-[90%] flex flex-row'>
          <div className='icon'>{SnackBars[text].icon}</div>
          <div className='ml-2'>{SnackBars[text].text}</div>
        </div>
        {SnackBars[text].subText && (
          <div className='ml-2'>{SnackBars[text].subText}</div>
        )}
      </div>
    </div>
  )
})

export default SnackbarUI

export enum SnackBarTypes {
  POSTING = 'POSTING',
  POSTED = 'POSTED',
}

export const SnackBars = {
  POSTING: {
    text: 'Posting...',
    subText: '',
    icon: <Loader color='white' className='animate-spin w-5' />,
  },
  POSTED: {
    text: 'Posted',
    subText: 'View',
    icon: <Check color='white' className='w-5' />,
  },
}
