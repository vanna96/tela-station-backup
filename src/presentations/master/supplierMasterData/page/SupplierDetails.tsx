import { withRouter } from "@/routes/withRouter";
import React, { Component, useEffect } from "react";
import Taps from "@/components/button/Taps";
import Modal from "@/components/modal/Modal";
import { CircularProgress } from "@mui/material";
import DocumentHeaderComponent from "@/components/DocumenHeaderComponent";
import PreviewAttachment from "@/components/attachment/PreviewAttachment";
import BusinessPatners from "@/models/BusinessPartner";
import BussinessPartnersRepository from "@/services/actions/bussinessPartnerRepositorys";
import BusinessPartnerGroupsRepository from "@/services/actions/businessPartnerGroups";
import CurrencyRepository from "@/services/actions/currencyRepository";
import { currencyFormat } from "@/utilies";
import ShippingTypeRepository from "@/services/actions/shippingTypeRepository";
import FactoringIndicatorRepository from "@/services/actions/factoringIndicatorRepository";
import IndustryRepository from "@/services/actions/industries";
import BuyerRepository from "@/services/actions/buyerRepository";
import Territory from "@/models/Territory";
import TerritoryRepository from "@/services/actions/territoryRepository";
import Industry from "@/models/Industry";
import CountryRepository from "@/services/actions/countryReporitory";
import { functionalUpdate } from "react-query/types/core/utils";
import PaymentTermTypeRepository from "@/services/actions/paymentTermTypeRepository";
import PriceListRepository from "@/services/actions/pricelistReporitory";
import PriorityRepository from "@/services/actions/priorityReposiroty";
import HolidayRepository from "@/services/actions/holidaysRepository";
class SupplierDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      isError: false,
      message: "",
    };

    this.initData = this.initData.bind(this);
  }

  componentDidMount(): void {
    this.initData();
  }

  initData() {
    const { id } = this.props.match.params;
    const data = this.props.location.state as BusinessPatners;
    console.log(data);

    if (data) {
      setTimeout(() => {
        let supplier = data;
        supplier as BusinessPatners;
        if ("") {
        } else {
          this.setState({ ...supplier, loading: false });
        }
      }, 500);
    } else {
      new BussinessPartnersRepository()
        .find(id)
        .then((res: any) => {
          this.setState({ ...res, loading: false });
        })
        .catch((e: Error) => {
          this.setState({ isError: true, message: e.message });
        });
    }
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col p-4 gap-4">
        <DocumentHeaderComponent data={this.state} />

        <Modal
          open={this.state.isError}
          title="Oop"
          onClose={() => {}}
          onOk={() => console.log(this.props.history.goBack())}
        >
          <span>{this.state?.message}</span>
        </Modal>

        {this.state.loading ? (
          <div className="grow flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="min-h-[18rem] grid grid-cols-2 gap-3 w-full shadow-sm rounded-lg bg-white text-[12px] p-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Card Code</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.cardCode}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Card Name</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.cardName}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Foreign Name</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.cardForeignName}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Group</span>
                  <span className="w-8/12 font-medium">
                    :{" "}
                    {new BusinessPartnerGroupsRepository().find(
                      this.state.groupCode
                    )?.name ?? "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Currency</span>
                  <span className="w-8/12 font-medium">
                    :{" "}
                    {new CurrencyRepository().find(this.state.currency)?.name ??
                      "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Federal Tax ID</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.federalTaxID}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Account Balance</span>
                  <span className="w-8/12 font-medium">
                    : {currencyFormat(this.state.currentAccountBalance)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">
                    Goods Receipt POs
                  </span>
                  <span className="w-8/12 font-medium">
                    : {currencyFormat(this.state.openDeliveryNotesBalance)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Purchase Orders</span>
                  <span className="w-8/12 font-medium">
                    : {currencyFormat(this.state.openOrdersBalance)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grow flex flex-col gap-3 p-6 shadow-sm rounded-lg bg-white">
              <Taps
                items={[
                  "General",
                  "Contact Persons",
                  "Addresses",
                  "Payment Terms",
                  "Payment Run",
                  "Accountting",
                  "Remarks",
                ]}
              >
                <General data={this.state} />
                <ContactPerson data={this.state} />
                <Address data={this.state} />
                <Paymentterms data={this.state} />
                <PreviewAttachment
                  attachmentEntry={this.state.attachmentEntry}
                />
              </Taps>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(SupplierDetail);

function General(props: any) {
  const { data }: any = props;
  return (
    <>
      <div className="grow w-full grid grid-cols-2 gap-2 text-sm py-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Tel 1</span>
            <span className="w-8/12 font-medium">: {data?.phone1}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Tel 2</span>
            <span className="w-8/12 font-medium">: {data?.phone2}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Mobile Phone</span>
            <span className="w-8/12 font-medium">: {data?.cellular}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Fax</span>
            <span className="w-8/12 font-medium">: {data?.fax}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">E-Mail</span>
            <span className="w-8/12 font-medium">: {data?.emailAddress}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Website</span>
            <span className="w-8/12 font-medium">: {data?.website}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Shipping Type</span>:{" "}
            {new ShippingTypeRepository().find(data?.shippingType)?.Name ??
              "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Password</span>
            <span className="w-8/12 font-medium">: {data?.password}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Factoring Indicator</span>
            <span className="w-8/12 font-medium">: {data?.indicator}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">
              Business Partner Project
            </span>
            <span className="w-8/12 font-medium">: {data?.projectCode}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Industry</span>:{" "}
            {new IndustryRepository().find(data?.industry)?.name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Type Of Business</span>
            <span className="w-8/12 font-medium">: {data?.companyPrivate}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Alias Name</span>
            <span className="w-8/12 font-medium">: {data?.aliasName}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Contact Person</span>
            <span className="w-8/12 font-medium">: {data?.contactPerson}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">ID No. 2</span>
            <span className="w-8/12 font-medium">: {data?.additionalID}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">unified Federal Tax ID</span>
            <span className="w-8/12 font-medium">
              : {data?.unifiedFederalTaxID}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Remark</span>
            <span className="w-8/12 font-medium">: {data?.notes}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Industry</span>:{" "}
            {new IndustryRepository().find(data?.industry)?.name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Teritory</span>:{" "}
            {new TerritoryRepository().find(data?.territory)?.name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Remark</span>
            <span className="w-8/12 font-medium">
              : {data?.globalLocationNumber}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
function ContactPerson(props: any) {
  const { data }: any = props;
  return (
    <>
      <div className="grow w-full grid grid-cols-2 gap-2 text-sm py-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Contact ID</span>
            <span className="w-8/12 font-medium">: {data?.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">First Name</span>
            <span className="w-8/12 font-medium">: {data?.firstName}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Middle Name</span>
            <span className="w-8/12 font-medium">: {data?.middleName}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Last Name</span>
            <span className="w-8/12 font-medium">: {data?.lastName}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Title</span>
            <span className="w-8/12 font-medium">: {data?.title}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Position</span>
            <span className="w-8/12 font-medium">: {data?.position}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Address</span>
            <span className="w-8/12 font-medium">: {data?.address}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">TelePhone 1</span>
            <span className="w-8/12 font-medium">: {data?.phone1}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">TelePhone 2</span>
            <span className="w-8/12 font-medium">: {data?.phone2}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Mobile Phone</span>:{" "}
            <span className="w-8/12 font-medium">: {data?.mobilePhone}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Fax</span>
            <span className="w-8/12 font-medium">: {data?.fax}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">E-Mail</span>
            <span className="w-8/12 font-medium">: {data?.e_Mail}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Email Group</span>
            <span className="w-8/12 font-medium">: {data?.emailGroupCode}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Pager</span>
            <span className="w-8/12 font-medium">: {data?.pager}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Remark 1</span>
            <span className="w-8/12 font-medium">: {data?.remarks1}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Remark 2</span>
            <span className="w-8/12 font-medium">: {data?.remarks1}</span>
          </div>

          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">
              Country/Region Of Birth
            </span>
            :{" "}
            {new CountryRepository().find(data?.industry)?.placeOfBirth ??
              "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Date Of Birth</span>:{" "}
            <span className="w-8/12 font-medium">: {data?.dateOfBirth}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Gender</span>
            <span className="w-8/12 font-medium">: {data?.gender}</span>
          </div>
        </div>
      </div>
    </>
  );
}
function Address(props: any) {
  const { data }: any = props;
  return (
    <>
      <div className="grow w-full grid grid-cols-2 gap-2 text-sm py-2">
        <div className="flex flex-col gap-2">
          <span className="text-black text-[18px]">Pay To</span>
          <div className="flex gap-2 mt-3">
            <span className="w-4/12 text-gray-500">Address ID</span>
            <span className="w-8/12 font-medium">: {data?.addressName}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Address Name 2</span>
            <span className="w-8/12 font-medium">: {data?.addressName2}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Address Name 3</span>
            <span className="w-8/12 font-medium">: {data?.addressName3}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Street PO Box</span>
            <span className="w-8/12 font-medium">: {data?.street}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Block</span>
            <span className="w-8/12 font-medium">: {data?.block}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">City</span>
            <span className="w-8/12 font-medium">: {data?.city}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Zip Code</span>
            <span className="w-8/12 font-medium">: {data?.zipCode}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Country</span>
            <span className="w-8/12 font-medium">: {data?.county}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">State</span>
            <span className="w-8/12 font-medium">: {data?.state}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Country/Region</span>
            <span className="w-8/12 font-medium">: {data?.country}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Street No.</span>
            <span className="w-8/12 font-medium">: {data?.streetNo}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Building/Floor/Room</span>
            <span className="w-8/12 font-medium">
              : {data?.buildingFloorRoom}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black text-[18px]">Ship To</span>
          <div className="flex gap-2 mt-3">
            <span className="w-4/12 text-gray-500">Address ID</span>
            <span className="w-8/12 font-medium">: {data?.addressName}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Address Name 2</span>
            <span className="w-8/12 font-medium">: {data?.addressName2}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Address Name 3</span>
            <span className="w-8/12 font-medium">: {data?.addressName3}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Street PO Box</span>
            <span className="w-8/12 font-medium">: {data?.street}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Block</span>
            <span className="w-8/12 font-medium">: {data?.block}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">City</span>
            <span className="w-8/12 font-medium">: {data?.city}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Zip Code</span>
            <span className="w-8/12 font-medium">: {data?.zipCode}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Country</span>
            <span className="w-8/12 font-medium">: {data?.county}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">State</span>
            <span className="w-8/12 font-medium">: {data?.state}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Country/Region</span>
            <span className="w-8/12 font-medium">: {data?.country}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Street No.</span>
            <span className="w-8/12 font-medium">: {data?.streetNo}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Building/Floor/Room</span>
            <span className="w-8/12 font-medium">
              : {data?.buildingFloorRoom}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
function Paymentterms(props: any) {
  const { data }: any = props;
  return (
    <>
      <div className="grow w-full grid grid-cols-2 gap-2 text-sm py-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Payment Terms</span>
            {new PaymentTermTypeRepository().find(data?.payTermsGrpCode)
              ?.Name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Interest On Arrears %</span>
            <span className="w-8/12 font-medium">
              : {data?.intrestRatePercent}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Price List</span>
            {new PriceListRepository().find(data?.priceListNum)?.name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Total Discount %</span>
            <span className="w-8/12 font-medium">
              : {data?.discountPercent}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Credit limit</span>
            <span className="w-8/12 font-medium">: {data?.creditLimit}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Commitment limit</span>
            <span className="w-8/12 font-medium">: {data?.maxCommitment}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">
              Effective Discount Groups
            </span>
            <span className="w-8/12 font-medium">
              : {data?.effectiveDiscount}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Effective Price</span>
            <span className="w-8/12 font-medium">: {data?.effectivePrice}</span>
          </div>
          <span className="text-black text-[18px]">Business Partner Bank</span>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Bank Country/Region</span>:
            {new CountryRepository().find(data?.bankCountry)?.Name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Bank Name</span>
            {new CountryRepository().find(data?.defaultBankCode)?.Name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Bank Code</span>
            <span className="w-8/12 font-medium">
              : {data?.bankCode}
            </span>
          </div>

          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Account</span>
            <span className="w-8/12 font-medium">: {data?.defaultAccount}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">BIC/SWIFT Code</span>
            <span className="w-8/12 font-medium">: {data?.bICSwiftCode}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Bank Account Name</span>
            <span className="w-8/12 font-medium">
              : {data?.defaultBankCode}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Branch</span>
            <span className="w-8/12 font-medium">: {data?.defaultBranch}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">ControlKey</span>
            <span className="w-8/12 font-medium">: {data?.controlKey}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">IBAN</span>
            <span className="w-8/12 font-medium">: {data?.iBAN}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Mandate ID</span>
            <span className="w-8/12 font-medium">: {data?.mandateID}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Date Of Signature</span>
            <span className="w-8/12 font-medium">: {data?.signatureDate}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Average Delay</span>
            <span className="w-8/12 font-medium">: {data?.avarageLate}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Price List</span>:{" "}
            {new PriorityRepository().find(data?.priority)?.name ?? "N/A"}
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Default IBAN</span>
            <span className="w-8/12 font-medium">: {data?.iBAN}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-4/12 text-gray-500">Holiday</span>:{" "}
            {new HolidayRepository().find(data?.priority)?.name ?? "N/A"}
          </div>
        </div>
      </div>
    </>
  );
}
