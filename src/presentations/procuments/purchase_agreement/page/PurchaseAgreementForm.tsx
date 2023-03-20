import CoreFormDocument from '@/components/core/CoreFormDocument';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';
import GeneralForm from "../components/GeneralForm";
import HeadingForm from "../components/HeadingForm";



export default class PurchaseAgreementForm extends CoreFormDocument {

    constructor(props: any) {
        super(props)
        this.state = {
            ...this.state,
        } as any
    }

    componentDidMount(): void {
    }


    FormRender = () => {
        return <>
            <form className='flex flex-col gap-4'>
                <HeadingForm
                    handlerOpenVendor={() => {
                        this.handlerOpenVendor();
                    }}
                />
                <GeneralForm />
            </form>
        </>
    }
}