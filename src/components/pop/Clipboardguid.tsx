import React from 'react'
import photo from './photo_2023-06-22_10-49-32.jpg'
import { AiOutlineWarning } from "react-icons/ai"
const Clipboardguid = ({ close }:any) => {
  return (
    <div className='guid p-4'>
      <div className='w-full flex items-center p-2 h-[40px] border-b-[1.5px]'>
        <span className='text-red-500 text-[20px]'><AiOutlineWarning /></span>
        <span className='ml-3 text-[16px] text-red-500'>Requied</span>
      </div>
      <div className='text-[13px] leading-6 text-black mt-4'>Your Clipboard Permession At Header URL Is Turn Off Please Enable </div>
      <button onClick={close} className='p-1 px-2 rounded float-right text-b text-sm hover:bg-blue-300 duration-300 mt-2 bg-blue-200'>Close</button>
    </div>
  )
}

export default Clipboardguid