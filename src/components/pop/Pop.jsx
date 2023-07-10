import { CircularProgress } from '@mui/material'
import React from 'react'
import { CollaseContext } from './../../contexts/toggleStateContext';
import { useContext } from 'react';

const PopCover = ({ open}) => {

    const { collapse, setCollapse } = useContext(CollaseContext)
  return (
    <div className={`w-[100%] h-[100%] ml-3 shadow-sm shadow-blue-500 rounded-sm flex items-center justify-center fixed z-50 opa ${open ? "block" : "hidden"} `}>
      <div className={`${collapse ? "mr-[19.5%]":"mr-[7rem]"}  inline-block text-white`}>
        <CircularProgress color='inherit'/>
      </div>
    </div>
  )
}

export default PopCover
