


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';
import InventoryMasterPage from '@/presentations/inventory';

export default function InventoryRoute() {
    return (
        <Routes>
            <Route index element={<InventoryMasterPage />} />
        </Routes>
    )
}
