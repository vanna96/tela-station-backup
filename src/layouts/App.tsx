import React, { useContext } from 'react'

import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useCookies } from 'react-cookie';
import { ThemeContext, useThemeContext } from '@/contexts';
import TemporaryDrawer from './RightBar';

export default function App() {
    const [cookies] = useCookies(["sessionId"]);

    if (!cookies.sessionId) return <Navigate to={"/login"} />

    const { theme } = useContext(ThemeContext);

    return (
        <div className={`h-full w-full flex gap-0 transition-all duration-300 ${theme === 'light' ? '' : 'bg-slate-700 text-white'}`}>
            <SideBar />

            <div className='grow ml-2  rounded-lg relative  overflow-auto'>
             
                <Outlet />
            </div>
        </div>
    )
}
