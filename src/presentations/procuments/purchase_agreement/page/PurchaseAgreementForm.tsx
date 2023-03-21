import CoreFormDocument from '@/components/core/CoreFormDocument';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';
import GeneralForm from "../components/GeneralForm";
import HeadingForm from "../components/HeadingForm";
import { withRouter } from '@/routes/withRouter';
import ContentForm from '../components/ContentForm';


class PurchaseAgreementForm extends CoreFormDocument {

    constructor(props: any) {
        super(props)
        this.state = {
            ...this.state,
            agreementMethod: 'I',
            agreementType: 'G',
            status: 'D',
            renewal: false,

        } as any


        this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
        this.handlerAddItem = this.handlerAddItem.bind(this);
    }

    componentDidMount(): void {
    }

    handlerRemoveItem(code: string) {
        let items = [...this.state.items ?? []];
        const index = items.findIndex((e: any) => e?.ItemCode === code);
        items.splice(index, 1)
        this.setState({ ...this.state, items: items })
    }

    handlerAddItem({ value, record, field }: any) {
        let items = [...this.state.items ?? []];
        let item = this.state.items?.find((e: any) => e?.ItemCode === record?.ItemCode);
        item[field] = value;
        const index = items.findIndex((e: any) => e?.ItemCode === record.itemCode);
        if (index > 0) items[index] = item;
        this.setState({ ...this.state, items: items })
    }




    FormRender = () => {

        return <>
            <form className='flex flex-col gap-4'>
                <HeadingForm
                    data={this.state}
                    handlerOpenVendor={() => {
                        this.handlerOpenVendor();
                    }}
                    handlerChange={(key, value) => this.handlerChange(key, value)}
                    handlerOpenProject={() => this.handlerOpenProject()}
                />
                <GeneralForm
                    data={this.state}
                    handlerChange={(key, value) => this.handlerChange(key, value)}
                />
                <ContentForm
                    data={this.state}
                    handlerAddItem={() => this.handlerOpenItem()}
                    handlerRemoveItem={this.handlerRemoveItem}
                    handlerChangeItem={this.handlerAddItem}
                />
            </form>
        </>
    }
}

export default withRouter(PurchaseAgreementForm)