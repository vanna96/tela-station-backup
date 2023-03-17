import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import ProcumentRoute from './ProcumentRoute'
import Login from '../presentations/login/page/Login'
import App from '../layouts/App'

const Router = () => <AnimatePresence>
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<App />} >
                <Route path='/procument/*' element={<ProcumentRoute />} errorElement={<span>Error</span>} />
            </Route>
        </Routes>
    </BrowserRouter>
</AnimatePresence>

export default Router;