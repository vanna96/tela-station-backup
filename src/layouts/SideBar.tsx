import React, { useContext, useState } from 'react'
import { FiGrid, FiShoppingBag } from "react-icons/fi";
import { GiFactory } from "react-icons/gi";
import { MdOutlineDirectionsTransitFilled, MdOutlineLightMode } from "react-icons/md";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronForwardSharp } from "react-icons/io5";
import { BsClipboardData } from "react-icons/bs";
import { AiOutlineSetting } from 'react-icons/ai';
import { ThemeContext, useThemeContext } from '@/contexts';
import { bgColor } from '@/assets';


export default function SideBar(props: any) {
    const [collapse, setCollapse] = useState(true)
    const navigate = useNavigate();

    const goTo = (route: string) => {
        setCollapse(true)
        navigate(route)
    };

    const logout = () => navigate('/login');

    const { theme, setTheme } = useContext(ThemeContext);

    const handlerSwitchTheme = () => {
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
        if (theme === 'light') {
            setTheme('dark');
            return
        }

        setTheme('light');
    }

    return (
        <aside className={`${collapse ? 'min-w-[18rem] 2xl:min-w-[14rem] xl:min-w-[13rem] p-2 px-4 xl:px-2' : 'w-[4rem] px-2'} ${theme === 'light' ? 'bg-white text-[#a8a6a6]' : 'bg-slate-800 text-white'} shadow transition-min-width duration-300 flex flex-col gap-16   py-8 relative z-20`}>
            <h1 className='text-2xl 2xl:text-xl xl:text-lg font-bold uppercase text-center whitespace-nowrap overflow-hidden text-inherit  '>SAP</h1>

            <div role='button' onClick={() => setCollapse(!collapse)} className={`p-[0.6rem] border ${theme === 'light' ? 'border-white' : 'border-gray-700'} rounded-full absolute bg-inherit shadow z-50 -right-[18px]`}><IoChevronForwardSharp className={`${collapse ? '' : 'rotate-180'} duration-300 `} /></div>

            <div className='grow flex flex-col gap-2 whitespace-nowrap overflow-hidden text-base 2xl:text-sm xl:text-[12px]'>
                <NavButton onClick={() => goTo('/system-initialize')} route="system-initialize" collapse={collapse} icon={<FiGrid />} title="System Initialize" />
                <NavButton onClick={() => goTo('/master-data')} route="master-data" collapse={collapse} icon={<BsClipboardData />} title="Master Data" />
                <NavButton onClick={() => goTo('/procument')} route="procument" collapse={collapse} icon={<HiOutlineDocumentPlus />} title="Procument" />
                <NavButton onClick={() => goTo('/sale')} route="sale" collapse={collapse} icon={<FiShoppingBag />} title="Sale" />
                <NavButton onClick={() => goTo('/inventory')} route="inventory" collapse={collapse} icon={<GiFactory />} title="Inventory" />
                <NavButton onClick={() => goTo('/logistic')} route="logistic" collapse={collapse} icon={<MdOutlineDirectionsTransitFilled />} title="Logistic" />
            </div>
            <div className='mb-6 text-stone-900 font-bold overflow-hidden xl:text-[13px]'>
                <NavButton onClick={handlerSwitchTheme} route="setting" collapse={collapse} icon={<MdOutlineLightMode />} title="Dark" />
                <NavButton onClick={() => { }} route="setting" collapse={collapse} icon={<AiOutlineSetting />} title="Setting" />
                <NavButton onClick={logout} route="logout" collapse={collapse} icon={<VscSignOut />} title="Logout" />
            </div>
        </aside>
    )
}


type NavButtonProps = {
    collapse: boolean,
    title: string,
    route: string,
    disable?: boolean,
    icon: React.ReactElement,
    onClick: () => void
}


export function NavButton(props: NavButtonProps) {
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    return (
        <div role="button"
            onClick={props.onClick}
            className={`flex ${props.collapse ? 'px-10 2xl:px-4' : 'pl-[0.9rem]'} ${location.pathname?.split('/')[1] === props.route ? `${theme === 'light' ? 'bg-blue-400' : 'bg-gray-700'} shadow text-white` : ''}  transition-all duration-300  p-[0.6rem] ${theme === 'light' ? 'hover:bg-blue-400' : 'hover:bg-gray-700 text-white'} text-[#a8a6a6] hover:shadow-sm hover:text-white rounded-lg text-center items-center gap-4 `}
        >
            <span className={`${location.pathname?.split('/')[1] === props.route ? '' : ''}  text-xl font-extrabold`}>
                {props.icon}
            </span>
            {props.collapse ? <span className={location.pathname?.split('/')[1] === props.route ? 'text-white' : 'font-normal  '} >{props.title}</span> : null}
        </div>
    )
}

