import { withRouter } from '@/routes/withRouter';
import React, { Component } from 'react'
import { useParams } from 'react-router-dom';

class PurchaseAgreementDetail extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }


    componentDidMount(): void {
        const { id } = this.props.match.params;
    }

    render() {
        return (
            <div>PurchaseAgreementDetail</div>
        )
    }
}

export default withRouter(PurchaseAgreementDetail)