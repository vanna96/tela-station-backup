import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Modal from '../../../../components/modal/Modal';
import ItemModal from '../../../../components/modal/ItemModal';
import Button from '@mui/material/Button';


export default function PurchaseAgreementDetail() {

    const location = useLocation();
    const [purchaseAgreement, setPurchaseAgreement] = useState<PurchaseAgreement>();

    React.useEffect(() => {
        setPurchaseAgreement(location.state)
    }, [])

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const ref = React.useRef<HTMLIFrameElement>(null);

    return (
        <>
            <ItemModal open={isOpen} onClose={closeModal} />
        </>
    )
}

