import FormCard from '@/components/card/FormCard';
import MUITextField from '@/components/input/MUITextField';
import MUISelect from '@/components/selectbox/MUISelect';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import { SelectChangeEvent, TextField } from '@mui/material';
import ItemGroupSelectSelect from '@/components/selectbox/ItemGroupselect';
import ItemsModal from '@/components/modal/itemsModal';
import UOMSelect from '@/components/selectbox/UnitofMeasurment';
import Binlocation from '@/models/Binlocation';
export interface IGeneralFormProps {
  data: any,
  handlerChange: (key: string, value: any) => void,
  edit?: boolean,
  handleOpenItems: () => void,
}


export default function General({ data, handlerChange, edit, handleOpenItems }: IGeneralFormProps) {
  //---------------------------1----------------------------
  const [show1, setShow1] = React.useState<boolean>(data?.restrictedItemType === 'briSpecificItem');
  const [show2, setShow2] = React.useState<boolean>(data?.restrictedItemType === 'briSingleItemOnly');
  const [show3, setShow3] = React.useState<boolean>(data?.restrictedItemType === 'briSpecificItemGroup');
  const [show4, setShow4] = React.useState<boolean>(data?.restrictedItemType === 'SingleItemGrouponly');
  //---------------------------2----------------------------
  const [bShow, setBShow] = React.useState<boolean>(data?.batchRestrictions === 'brbSingleBatch');
  //---------------------------------------------------------
  const [Ushow1, setUShow1] = React.useState<boolean>(data?.restrictedUoMType === 'bruSpecificUoM');
  const [Ushow2, setUShow2] = React.useState<boolean>(data?.restrictedUoMType === 'bruSingleUoMOnly');
  const [Ushow3, setUShow3] = React.useState<boolean>(data?.restrictedUoMType === 'bruSpecificUoMGroup');
  const [Ushow4, setUShow4] = React.useState<boolean>(data?.restrictedUoMType === 'bruSingleUoMGrouponly');
  //------------------------3---------------------------------
  const [Tshow, setTShow] = React.useState<boolean>(data?.restrictedTransType === 'brtAllTrans' || data?.restrictedTransType === 'brtNoRestrictions' || data?.restrictedTransType === '2' || data?.restrictedTransType === 'brtAllExceptInventoryTrans');
  const [Tshow1, setTShow1] = React.useState<boolean>(data?.restrictedTransType === '3');

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    const key = 'restrictedItemType';
    const value = event.target.value;
    const selectedValue1 = event.target.value as string;
    const selectedValue2 = event.target.value as string;
    const selectedValue3 = event.target.value as string;
    const selectedValue4 = event.target.value as string;

    // ------------------------------------------------
    setShow1(selectedValue1 === "briSpecificItem");
    setShow2(selectedValue2 === "briSingleItemOnly");
    setShow3(selectedValue3 === "briSpecificItemGroup");
    setShow4(selectedValue4 === "SingleItemGrouponly");

    //-------------------------------------------------
    handlerChange('restrictedItemType', selectedValue1);
    handlerChange('restrictedItemType', selectedValue2);
    handlerChange('restrictedItemType', selectedValue3);
    handlerChange('restrictedItemType', selectedValue4);
    handlerChange(key, value);
  };
  const handleSelectChangeB = (event: SelectChangeEvent<any>) => {
    const key = 'batchRestrictions';
    const value = event.target.value;
    const selectedValue = event.target.value as string;
    // ------------------------------------------------
    setBShow(selectedValue === "brbSingleBatch");
    //-------------------------------------------------
    handlerChange('batchRestrictions', selectedValue);
    handlerChange(key, value);
  };
  const handleSelectChangeU = (event: SelectChangeEvent<any>) => {
    const key = 'restrictedUoMType';
    const value = event.target.value;
    const selectedValue1 = event.target.value as string;
    const selectedValue2 = event.target.value as string;
    const selectedValue3 = event.target.value as string;
    const selectedValue4 = event.target.value as string;

    // ------------------------------------------------
    setUShow1(selectedValue1 === "bruSpecificUoM");
    setUShow2(selectedValue2 === "bruSingleUoMOnly");
    setUShow3(selectedValue3 === "bruSpecificUoMGroup");
    setUShow4(selectedValue4 === "bruSingleUoMGrouponly");

    //-------------------------------------------------
    handlerChange('restrictedUoMType', selectedValue1);
    handlerChange('restrictedUoMType', selectedValue2);
    handlerChange('restrictedUoMType', selectedValue3);
    handlerChange('restrictedUoMType', selectedValue4);
    handlerChange(key, value);
  };
  const handleSelectChangeT = (event: SelectChangeEvent<any>) => {
    const key = 'restrictedTransType';
    const value = event.target.value;
    const selectedValue = event.target.value as string;
    const selectedValue1 = event.target.value as string;

    // ------------------------------------------------
    setTShow(selectedValue === "brtAllTrans" || selectedValue === "brtNoRestrictions" || selectedValue === "2" || selectedValue === "brtAllExceptInventoryTrans");
    setTShow1(selectedValue === "3");

    //-------------------------------------------------
    handlerChange('restrictedTransType', selectedValue);
    handlerChange('restrictedTransType', selectedValue1);
    handlerChange(key, value);
  };
  console.log(data);
  
  return (
    <FormCard title='General'>
      <h1>
        <div className="flex items-center text-sm pt-3">
          <Checkbox />
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Active BinLocation
          </label>
        </div>
        <div className="flex items-center text-sm">
          <Checkbox />
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            ExcludeAutoAllocOnIssue
          </label>
        </div>
      </h1>
      <h1>
        <div className="flex items-center text-sm pt-3">
          <Checkbox />
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Receiving BinLocation
          </label>
        </div> </h1>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Item Weight:" disabled value={data?.cardCode} name="" />
          <MUITextField label="No. of Items:" disabled value={data?.cardName} name="" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Alternative Sort Code:" onChange={(e) => handlerChange('alternativeSortCode', e.target.value)}
            value={data?.alternativeSortCode} name="AlternativeSortCode" />
          <MUITextField label="Minimun Quantity:" onChange={(e) => handlerChange('minimumQty', e.target.value)} value={data?.minimumQty} name="MinimumQty" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Maximun Weight:" onChange={(e) => handlerChange('maximunWeight', e.target.value)} value={data?.maximunWeight} name="MaximunWeight" />
          <MUITextField label="Bar Code:" onChange={(e) => handlerChange('barCode', e.target.value)} value={data?.barCode} name="BarCode" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Maximun Quantity:" onChange={(e) => handlerChange('maximumQty', e.target.value)} value={data?.maximumQty} name="MaximumQty" />
          <MUITextField label="Item Quantity:" disabled onChange={(e) => handlerChange('maximunWeigt', e.target.value)} value={data?.cardCode} name="" />
          <MUITextField label="No. of Batches/Serials:" disabled value={data?.cardName} name="" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Restricted Item Type
            </label>
            <MUISelect
              items={[
                { value: "briNone", name: "None" },
                { value: "briSpecificItem", name: "Specific Item" },
                { value: "briSingleItemOnly", name: "Single Item Only" },
                { value: "briSpecificItemGroup", name: "Specific Item Group" },
                { value: "briSingleItemGrouponly", name: "Single Item Group Only" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={handleSelectChange}
              value={data?.restrictedItemType ?? "briNone"}
              name="RestrictedItemType"
            />


          </div>
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Batch Restriction
            </label>
            <MUISelect
              items={[
                { value: "brbNoRestrictions", name: "None" },
                { value: "brbSingleBatch", name: "Single Batch" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={handleSelectChangeB} value={data?.batchRestrictions ?? "brbNoRestrictions"} name="BatchRestrictions" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Restricted UoM Type
            </label>
            <MUISelect
              items={[
                { value: "bruNone", name: "None" },
                { value: "bruSpecificUoM", name: "Specific UoM" },
                { value: "bruSingleUoMOnly", name: "Single UoM Only" },
                { value: "bruSpecificUoMGroup", name: "Specific UoM Group" },
                { value: "bruSingleUoMGrouponly", name: "Single UoM Group only" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={handleSelectChangeU}
              value={data?.restrictedUoMType ?? "bruNone"} name="RestrictedUoMType" />

          </div>
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Transaction Restriction
            </label>
            <MUISelect
              items={[
                { value: "brtNoRestrictions", name: "None" },
                { value: "brtAllTrans", name: "All transaction" },
                { value: "2", name: "Inbount Transactions" },
                { value: "3", name: "Outbound Transactions" },
                { value: "brtAllExceptInventoryTrans", name: "All Except Inventory Transfer and Counting Transactions" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={handleSelectChangeT}
              name="RestrictedTransType"
              value={data?.restrictedTransType ?? "brtNoRestrictions"}
            />
          </div>
          <div>
            <MUITextField label="Lastb Update On:" disabled={true} value={data?.c} name="" />
          </div>
          <div className=' h-[55px]'>
            {show1 && (
              <>
                <MUITextField
                  label="Item"
                  value={data?.specificItem ?? ''}
                  onChange={(e) => handlerChange('specificItem', e.target.value)}
                  name="SpecificItem"
                  endAdornment={true}
                  onClick={handleOpenItems}
                />
              </>
            )}
            {show2 && (
              <>
                <MUITextField
                  label="courent Item"
                  disabled
                  value={data?.specificItem ?? ''}
                  onChange={(e) => handlerChange('specificItem', e.target.value)}
                  name="SpecificItem"
                />
              </>
            )}
            {show3 && (
              <>
                <label htmlFor="" className='text-sm text-slate-600'>Item Group</label>
                <ItemGroupSelectSelect

                  value={data?.specificItemGroup ?? ''}
                  onChange={(e) => handlerChange('specificItemGroup', e.target.value)}
                  name="SpecificItemGroup"
                />
              </>
            )}
            {show4 && (
              <>
                <MUITextField
                  label="Single Item Group Only"
                  value={data?.field1 ?? ''}
                  onChange={(e) => handlerChange('specificItemGroup', e.target.value)}
                  disabled
                  name="SpecificItemGroup"
                />
              </>
            )}
          </div>
          <div className=' h-[55px]'>
            {bShow && (
              <>
                <MUITextField
                  label="Current Batch"
                  value={data?.currentBatch ?? ''}
                  onChange={(e) => handlerChange('currentBatch', e.target.value)}
                  disabled
                  name="CurrentBatch"
                />
              </>
            )}
          </div>
          <div>
            {Ushow1 && (
              <>
                <MUITextField
                  label="UoM"
                  value={data?.field1 ?? ''}
                  onChange={(e) => handlerChange('field1', e.target.value)}
                />
              </>
            )}
            {Ushow2 && (
              <>
                <MUITextField
                  label="courent UoM"
                  value={data?.field1 ?? ''}
                  onChange={(e) => handlerChange('field1', e.target.value)}
                  disabled
                />
              </>
            )}
            {Ushow3 && (
              <>
                <div className='flex flex-col gap-1 text-sm'>
                  <label htmlFor='PayTermsGrpCode' className='text-gray-500 text-[14px]'>UoM Group</label>
                  <div className=''>
                    <UOMSelect
                      value={data?.specificUoMGroup ?? ''}
                      onChange={(e) => handlerChange('specificUoMGroup', e.target.value)}
                      name="SpecificUoMGroup"
                    />
                  </div>
                </div>
              </>
            )}
            {Ushow4 && (
              <>
                <MUITextField
                  label="Current UoM Group"
                  value={data?.specificUoMGroup ?? ''}
                  onChange={(e) => handlerChange('specificUoMGroup', e.target.value)}
                  name="SpecificUoMGroup"
                  disabled
                />
              </>
            )}
          </div>


        </div>
        <div className='grid grid-cols-1'>
          <div>
            {Tshow && (
              <div className='w-[100%]'>
                <MUITextField
                  label="Reason"
                  value={data?.restrictionReason ?? ''}
                  onChange={(e) => handlerChange('restrictionReason', e.target.value)}
                />
              </div>
            )
            }
          </div>
        </div>


      </div>
    </FormCard>
  )
}