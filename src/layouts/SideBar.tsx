import React, { useContext, useState } from 'react'
import { FiGrid, FiShoppingBag } from "react-icons/fi";
import { GiFactory } from "react-icons/gi";
import { MdOutlineDirectionsTransitFilled, MdOutlineLightMode } from "react-icons/md";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useLocation, useNavigate } from 'react-router-dom';
import { BsClipboardData } from "react-icons/bs";
import { ThemeContext, useThemeContext } from '@/contexts';


export default function SideBar(props: any) {
    const navigate = useNavigate();

    const goTo = (route: string) => {
        navigate(route)
    };

    const { theme } = useContext(ThemeContext);

    return (
        <aside className={`border-r  px-2 transition-min-width duration-200 flex flex-col py-8 relative z-20 ${props?.collapse ? 'min-w-[13rem] ' : 'min-w-[4rem] '} ${theme === 'light' ? 'bg-white text-[#a8a6a6]' : 'bg-slate-700 text-white border-r-gray-800'}  `}>
            <h1 className='text-2xl 2xl:text-xl xl:text-lg font-bold uppercase text-center whitespace-nowrap overflow-hidden text-inherit  '>SAP</h1>
            <div className='mt-8 grow flex flex-col gap-2 whitespace-nowrap overflow-hidden text-base 2xl:text-sm xl:text-[12px]'>
                <NavButton onClick={() => goTo('/system-initialize')} route="system-initialize" collapse={props?.collapse} icon={<FiGrid />} title="System Initialize" />
                <NavButton onClick={() => goTo('/master-data')} route="master-data" collapse={props?.collapse} icon={<BsClipboardData />} title="Master Data" />
                <NavButton onClick={() => goTo('/procument')} route="procument" collapse={props?.collapse} icon={<HiOutlineDocumentPlus />} title="Procument" />
                <NavButton onClick={() => goTo('/sale')} route="sale" collapse={props?.collapse} icon={<FiShoppingBag />} title="Sale" />
                <NavButton onClick={() => goTo('/inventory')} route="inventory" collapse={props?.collapse} icon={<GiFactory />} title="Inventory" />
                <NavButton onClick={() => goTo('/logistic')} route="logistic" collapse={props?.collapse} icon={<MdOutlineDirectionsTransitFilled />} title="Logistic" />
                <NavButton onClick={() => goTo('/banking')} route="banking" collapse={props?.collapse} icon={<FiShoppingBag />} title="Banking" />
            {/* <div className='grow flex flex-col gap-2 whitespace-nowrap overflow-hidden text-base 2xl:text-sm xl:text-[12px]'>
                <NavButton onClick={() => goTo('/system-initialize')} route="system-initialize" collapse={collapse} icon={<FiGrid />} title="System Initialize" />
                <NavButton onClick={() => goTo('/master-data')} route="master-data" collapse={collapse} icon={<BsClipboardData />} title="Master Data" />
                <NavButton onClick={() => goTo('/procument')} route="procument" collapse={collapse} icon={<HiOutlineDocumentPlus />} title="Procument" />
                <NavButton onClick={() => goTo('/sale')} route="sale" collapse={collapse} icon={<FiShoppingBag />} title="Sale" />
                <NavButton onClick={() => goTo('/inventory')} route="inventory" collapse={collapse} icon={<GiFactory />} title="Inventory" />
                <NavButton onClick={() => goTo('/logistic')} route="logistic" collapse={collapse} icon={<MdOutlineDirectionsTransitFilled />} title="Logistic" />
                 */}
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
            className={`flex text-sm ${props.collapse ? 'pl-6 pr-10 2xl:px-4' : 'pl-[0.9rem]'} ${location.pathname?.split('/')[1] === props.route ? `bg-[#11174910] text-system-color` : ''}  transition-all duration-300  py-[0.6rem]  text-[#a8a6a6] rounded-lg items-center gap-4 `}
        >
            <span className={`${location.pathname?.split('/')[1] === props.route ? '' : ''}  text-xl `}>
                {props.icon}
            </span>
            {props.collapse ? <span className={location.pathname?.split('/')[1] === props.route ? 'text-system-color' : ''} >{props.title}</span> : null}
        </div>
    )
}

