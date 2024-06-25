import { SetStateAction } from 'jotai'
import React, { Dispatch } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import CustomAlert from './CustomAlert'

type BottomSheetProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CustomBottomSheet = ({ open, setOpen }: BottomSheetProps) => {
  const [alertOpen, setAlertOpen] = React.useState(false)

  const onDelete = () => {
    setAlertOpen(true)
  }
  const onReport = () => {}

  return (
    <BottomSheet open={open} onDismiss={() => setOpen(false)}>
      <div className='p-4 bg-gray-100/90'>
        <Row
          label='Delete'
          onClick={() => {
            onDelete()
          }}
          src='/img/delete.png'
        />
        <Row
          label='Report'
          onClick={() => {
            onReport()
          }}
          src='/svg/report.svg'
          scheme='warn'
        />
      </div>
    </BottomSheet>
  )
}

export default React.memo(CustomBottomSheet)

type RowProps = {
  label: string
  onClick: () => void
  src?: string
  scheme?: 'basic' | 'warn'
}

const Row = ({ label, onClick, src, scheme }: RowProps) => {
  return (
    <div
      onClick={() => onClick()}
      className={`mb-3 py-3 px-4 bg-white flex flex-row justify-between rounded-[15px] font-medium ${scheme == 'warn' ? 'text-red-500' : ''} content-center`}
    >
      <div>{label}</div>
      <div className='content-center'>
        {src && <img src={src} className='w-5' />}
      </div>
    </div>
  )
}
