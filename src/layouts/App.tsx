import React from 'react'

import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export default function App() {


    return (
        <div className='h-full w-full flex '>
            <SideBar />
            <div className='grow  rounded-lg bg-white shadow  overflow-auto'>
                <Outlet />
            </div>
        </div>
    )
}
