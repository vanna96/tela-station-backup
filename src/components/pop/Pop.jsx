import { CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const PopCover = ({ open, collapse }) => {
  return (
    <div className={`w-[100%] h-[100%] ml-3 shadow-sm shadow-blue-500 rounded-sm flex items-center justify-center fixed z-50 opa ${open ? "block" : "hidden"} `}>
      <div className='mr-[14.5rem] inline-block text-white'>
        <CircularProgress color='inherit'/>
      </div>
    </div>
  )
}

export default PopCover
