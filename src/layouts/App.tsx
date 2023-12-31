import React, { useContext } from 'react'

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { useCookies } from 'react-cookie';
import { ThemeContext, useThemeContext } from '@/contexts';
import { Backdrop, Button, CircularProgress, Menu, MenuItem, OutlinedInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { HiMenu } from 'react-icons/hi';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { RiUser3Line } from "react-icons/ri";
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Modal from '@/components/modal/Modal';

export default function App() {
    const [cookies] = useCookies(["sessionId"]);
    const location = useLocation();
    const navigate = useNavigate();

    if (!cookies.sessionId) return <Navigate to={"/login"} />

    const [collapse, setCollapse] = React.useState(localStorage.getItem('menu_collapse') === 'true');
    const [loading, setLoading] = React.useState(false)
    const { theme, setTheme } = useContext(ThemeContext);

    const switchTheme = () => {
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
        if (theme === 'light') {
            setTheme('dark');
            return
        }
        setTheme('light');
    }


    const goBack = () => {
        if (location.pathname !== '/') navigate(-1);
    };

    const signOut = () => {
        setLoading(true);
        localStorage.clear();
        sessionStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
        setTimeout(() => {
            setLoading(true);

            navigate('/login');
        }, 800)
    }

    const collapseChange = () => {
        const val = !collapse;
        setCollapse(val);
        localStorage.setItem('menu_collapse', val.toString());
    }

    return (

        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={() => { }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={`h-full w-full flex gap-0 transition-all duration-300 ${theme === 'light' ? '' : 'bg-slate-800 text-white'}`}>
                <SideBar collapse={collapse} />
                <div className='grow flex flex-col overflow-auto relative'>
                    <div className={`sticky z-50 top-0 px-2 pr-4 py-1 w-full shadow flex justify-between items-center ${theme === 'light' ? 'bg-white ' : 'bg-slate-700 '}`}>
                        <div>
                            <IconButton color="primary" aria-label="menu" component="label"
                                onClick={collapseChange}
                            >
                                <HiMenu />
                            </IconButton>
                            <Tooltip title="Back">
                                <IconButton color="primary" aria-label="menu" component="label"
                                    onClick={goBack}
                                >
                                    <MdKeyboardArrowLeft />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <IconButton
                                color="primary"
                                aria-label="menu"
                                component="label"
                                onClick={switchTheme}
                            >
                                {theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                            </IconButton>
                            <AccountMenu signOut={signOut} />
                        </div>
                    </div>
                    <div className='w-full flex flex-col grow overflow-auto '>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}


function AccountMenu(props: any) {

    const { theme } = React.useContext(ThemeContext);
    const [cookies] = useCookies(['user']);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const myProfile = React.createRef<MyProfileModal>();


    const signOut = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
        props.signOut();
    }

    const handlerOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
        myProfile.current?.onOpen()
    };



    return (
        <React.Fragment>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: '#64748b' }}></Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                className={`${theme === 'light' ? '' : 'text-white'}`}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: '14rem',
                        backgroundColor: theme === 'light' ? '#fff' : '#334155 !important',
                        color: 'white',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'inherit',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handlerOpenProfile} sx={{ fontSize: '14px' }}>
                    <ListItemIcon className='text-white'>
                        <RiUser3Line className='text-lg ' />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={signOut} sx={{ fontSize: '14px' }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <MyProfileModal ref={myProfile} user={cookies.user} />
        </React.Fragment>
    );
}

import CurrentUser from '@/presentations/login/model/CurrenctUser';

interface MyProfileModalProps {
    ref?: React.RefObject<MyProfileModal>,
    user: CurrentUser
}

class MyProfileModal extends React.Component<MyProfileModalProps, any> {

    static contextType = ThemeContext;

    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
        } as any

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onOpen() {
        this.setState({ open: true })
    }

    onClose() {
        this.setState({ open: false })
    }


    render() {
        const { theme }: any = this.context;

        return (
            <>
                <Modal
                    widthClass='w-[25rem]'
                    heightClass='h-[50vh]'
                    title=''
                    open={this.state.open}
                    onClose={this.onClose}
                    disableFooter={true}
                >
                    <div className={`w-full h-full ${theme === 'light' ? '' : 'text-white'} flex flex-col gap-2 p-10`}>
                        <div className='flex justify-center items-center mb-4'>
                            <Avatar sx={{ width: 120, height: 120, backgroundColor: '#64748b' }}></Avatar>
                        </div>

                        <div className='w-[15rem] mx-auto text-[16px] flex flex-col gap-1 justify-start items-start'>

                            <div className=''>Username : {this.props?.user?.UserName}</div>
                            <div className=''>Email : {this.props?.user?.Email}</div>
                            <div className=''>Branch : {this.props?.user?.Branch}</div>
                            <div className=''>Department : {this.props?.user?.Department}</div>
                        </div>
                    </div>

                </Modal>
            </>
        )
    }
}
