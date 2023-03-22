import React from 'react'

import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useCookies } from 'react-cookie';

export default function App() {
    const [cookies] = useCookies(["sessionId"]);

    if (!cookies.sessionId) return <Navigate to={"/login"} />

    return (
        <div className='h-full w-full flex '>
            <SideBar />
            <div className='grow  rounded-lg shadow  overflow-auto'>
                <Outlet />
            </div>
        </div>
    )
}
