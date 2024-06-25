import React, { Dispatch, SetStateAction } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../atom/ui/alert-dialog'

type AlertProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onClick: () => void
}

const CustomAlert = ({ open, setOpen, onClick }: AlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>hidewop</AlertDialogTrigger>
      <AlertDialogContent className='bg-white/90 w-[70%] rounded-[10px] overflow-hidden pb-20'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-[18px]'>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='absolute bottom-0 w-full flex flex-row border-t border-gray-400'>
          <button
            onClick={() => {
              setOpen(false)
            }}
            className='w-full p-3 text-[18px] text-blue-600'
          >
            Cancel
          </button>
          <div className='border-r border-gray-400'></div>
          <button
            onClick={() => onClick()}
            className='w-full p-3 font-medium text-[18px] text-[#ff1111]'
          >
            Continue
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default React.memo(CustomAlert)
