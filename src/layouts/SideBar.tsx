import React, { useState } from 'react'
import { FiGrid, FiShoppingBag } from "react-icons/fi";
import { GiFactory } from "react-icons/gi";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";
import { useLocation, useNavigate } from 'react-router-dom';

import { IoChevronForwardSharp } from "react-icons/io5";
import { BsClipboardData } from "react-icons/bs";


export default function SideBar() {
    const [collapse, setCollapse] = useState(true)
    const navigate = useNavigate();

    const goTo = (route: string) => {
        setCollapse(true)
        navigate(route)
    };

    const logout = () => navigate('/login')

    return (
        <aside className={`${collapse ? 'min-w-[18rem] 2xl:min-w-[14rem] xl:min-w-[13rem] p-2 px-4 xl:px-2' : 'w-[4rem] px-2'} transition-min-width duration-300 flex flex-col gap-16  text-[#a8a6a6] py-8 relative z-20`}>
            <h1 className='text-2xl 2xl:text-xl xl:text-lg font-bold uppercase text-center text-stone-800 whitespace-nowrap overflow-hidden '>Tela App</h1>
            <div role='button' onClick={() => setCollapse(!collapse)} className={`p-[0.7rem] border rounded-full absolute  bg-white shadow  z-50`}><IoChevronForwardSharp className={`${collapse ? '' : 'rotate-180'} duration-300 `} /></div>

            <div className='grow flex flex-col gap-2 whitespace-nowrap overflow-hidden text-base 2xl:text-sm xl:text-[13px]'>
                <NavButton onClick={() => goTo('/system-initialize')} route="system-initialize" collapse={collapse} icon={<FiGrid />} title="System Initialize" />
                <NavButton onClick={() => goTo('/master-data')} route="master-data" collapse={collapse} icon={<BsClipboardData />} title="Master Data" />
                <NavButton onClick={() => goTo('/procument')} route="procument" collapse={collapse} icon={<HiOutlineDocumentPlus />} title="Procument" />
                <NavButton onClick={() => goTo('/sale')} route="sale" collapse={collapse} icon={<FiShoppingBag />} title="Sale" />
                <NavButton onClick={() => goTo('/inventory')} route="inventory" collapse={collapse} icon={<GiFactory />} title="Inventory" />
                <NavButton onClick={() => goTo('/logistic')} route="logistic" collapse={collapse} icon={<MdOutlineDirectionsTransitFilled />} title="Logistic" />
            </div>
            <div className='mb-6 text-stone-900 font-bold overflow-hidden xl:text-[13px]'>
                <NavButton onClick={logout} route="logistic" collapse={collapse} icon={<VscSignOut />} title="Logout" />
            </div>
        </aside>
    )
}


type NavButtonProps = {
    collapse: boolean,
    title: string,
    route: string,
    icon: React.ReactElement,
    onClick: () => void
}


export function NavButton(props: NavButtonProps) {
    const location = useLocation();

    return (
        <div role="button"
            onClick={props.onClick}
            className={`flex ${props.collapse ? 'px-10 2xl:px-4' : 'pl-[0.9rem]'} ${location.pathname?.split('/')[1] === props.route ? 'bg-white shadow  text-slate-900' : ''}  transition-all duration-300  p-[0.6rem] hover:bg-white hover:shadow-sm hover:text-stone-900 rounded-lg text-center items-center gap-4 `}
        >
            <span className={`${location.pathname?.split('/')[1] === props.route ? 'text-blue-500' : ''} text-xl font-extrabold`}>
                {props.icon}
            </span>
            {props.collapse ? <span className={location.pathname?.split('/')[1] === props.route ? 'text-blue-400' : ''} >{props.title}</span> : null}
        </div>
    )
}

