// import React from "react";
// import TextField from "@mui/material/TextField";
// import { IoChevronForwardSharp } from "react-icons/io5";
// import VendorModal from "components/VendorModal";
// import DatePicker from "components/DatePicker";
// import MUISelect from "components/selectbox/MUISelect";
// import MUITextField from "components/MUITextField";
// import { useQuery } from "react-query";
// import documentSeries from "../../../../repository/document_serie";
// import { AGREEMENT_TYPE, DOCUMENT_SERIE } from "../../../../../constants";
// import ProjectModal from "../../../../components/modal/ProjectModal";
// import moment from "moment";
// import dayjs from "dayjs";

// export default function GeneralFormHeader({ formData, setFormData }) {
//   const [collapse, setCollapse] = React.useState(true);
//   let [isOpen, setIsOpen] = React.useState(false);
//   let [openProject, setOpenProject] = React.useState(false);

//   const handlerChangeVendor = (vendor) => {
//     console.log(vendor);
//     setFormData({ ...formData, ...vendor })
//   }

//   const docSeries = useQuery({
//     queryKey: ['purchase-agreement-series'],
//     queryFn: () => documentSeries(DOCUMENT_SERIE.BLANKED_AGREEMENT),
//     staleTime: Infinity,
//   });


//   const handlerChangeSeries = (event) => {
//     const document = docSeries.data?.find((e) => e.Series === event.target.value);
//     setFormData({ ...formData, series: event.target.value, docNo: document?.NextNumber })
//   }

//   const handlerOnChnage = (event, field) => {
//     let temp = { ...formData };

//     if (field.includes('date') || field.includes('Date'))
//       temp[field] = event;
//     else
//       temp[field] = event.target.value;

//     setFormData(temp)
//   }

//   const handlerSelectProject = (record) => {
//     setFormData({ ...formData, Project: record?.Code })
//   }

//   const handlerCloseProject = () => setOpenProject(false);
//   const handlerOpenProject = () => setOpenProject(true);



//   return (
//     <div className="flex flex-col gap-4 bg-white rounded-lg p-4 pb-6 shadow">
//       <div
//         role="button"
//         className="font-bold text-xl flex justify-between items-center p-2 px-4 rounded hover:bg-gray-100"
//         onClick={() => setCollapse(!collapse)}
//       >
//         <h2>Information</h2>
//         <div
//           role="button"
//           className={`${collapse ? "rotate-90" : "rotate-0"
//             }  rounded-full  duration-150 `}
//         >
//           <IoChevronForwardSharp />
//         </div>
//       </div>
//       <hr />

//       <VendorModal
//         open={isOpen}
//         onClose={() => setIsOpen(false)}
//         onOk={handlerChangeVendor}
//       />

//       <ProjectModal open={openProject} onOk={handlerSelectProject} onClose={handlerCloseProject} />

//       <div
//         className={`grid grid-cols-2 md:grid-cols-1 gap-10 rounded-lg px-4 ${collapse ? "" : "h-[0rem]"
//           } overflow-hidden transition-height duration-300 `}
//       >
//         <div className="flex flex-col gap-2">
//           <div className="grid grid-cols-2 gap-3">
//             <MUITextField label="Vendor Code" name="BPCode" value={formData?.CardCode} onClick={() => setIsOpen(true)} />

//             <MUITextField label="Vendor Name" name="BPName" value={formData?.CardName} />
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1 text-sm">
//               <label htmlFor="Code" className="text-gray-500 text-[14px]">Contact Person</label>
//               <div className="">
//                 <MUISelect
//                   items={formData?.ContactEmployees}
//                   aliasvalue="InternalCode"
//                   aliaslabel="Name"
//                   defaultValue={formData?.ContactPersonCode}
//                   key={formData?.ContactPersonCode}
//                   name="ContactPersonCode"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1 text-sm">
//               <MUITextField label="Vender Ref.No" name="" />
//             </div>
//           </div>

//           <div className="grid grid-cols- gap-3">
//             <div className="flex flex-col gap-1 text-sm">
//               <label htmlFor="Code" className="text-gray-500 text-[14px]">
//                 Currency
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 <TextField
//                   size="small"
//                   fullWidth
//                   className="w-full text-field bg-gray-100"
//                   value={formData?.Currency}
//                   name="BPCurrency"
//                 // disabled
//                 />
//                 <div></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2">
//           <div className="flex flex-col gap-1 text-sm">
//             <label htmlFor="Code" className="text-gray-500 text-[14px]">
//               No
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               <MUISelect
//                 items={[...docSeries.data ?? [], { Series: '-1', Name: 'Manual' }]}
//                 aliasvalue="Series"
//                 aliaslabel="Name"
//                 value={formData.series}
//                 key={formData.series}
//                 loading={docSeries.isLoading.toString()}
//                 onChange={handlerChangeSeries}
//                 name="Series"
//               />
//               <TextField size="small" name="DocNum" fullWidth className="w-full text-field" key={formData?.docNo} defaultValue={formData?.docNo} />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1 text-sm">
//               <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
//                 Agreement Method
//               </label>
//               <div className="">
//                 <MUISelect
//                   items={AGREEMENT_TYPE}
//                   value={formData.AgreementMethod ?? AGREEMENT_TYPE[0].value}
//                   key={formData.series}
//                   onChange={(event) => handlerOnChnage(event, 'AgreementMethod')}
//                   name="AgreementMethod"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-1 text-sm"></div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1 text-sm">
//               <label htmlFor="Code" className="text-gray-500 text-[14px]">
//                 Start Date
//               </label>
//               <div className="">
//                 <DatePicker name="StartDate" value={formData?.StartDate} key={formData?.StartDate} onChange={(e) => handlerOnChnage(e, 'StartDate')} />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1 text-sm">
//               <label htmlFor="Code" className="text-gray-500 text-[14px]">
//                 End Date
//               </label>
//               <div className="">
//                 <DatePicker name="EndDate" value={formData?.EndDate ?? null} key={formData?.EndDate} onChange={(e) => handlerOnChnage(e, 'EndDate')} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="">
//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1 text-sm">
//               <MUITextField label="Tel. No" key={formData?.Phone} defaultValue={formData?.Phone} />
//             </div>

//             <div className="flex flex-col gap-1 text-sm">
//               <MUITextField label="Email" key={formData?.EmailAddress} defaultValue={formData?.EmailAddress} />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3">
//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1 text-sm">
//               <MUITextField label="Project" name="Project" key={formData?.Project} defaultValue={formData?.Project} onClick={handlerOpenProject} />
//             </div>

//             <div className="flex flex-col gap-1 text-sm">
//               <label htmlFor="TerminateDate" className="text-gray-500 text-[14px]">
//                 Terminate Date
//               </label>
//               <div className="">
//                 <DatePicker name="TerminateDate" value={formData?.TerminateDate ?? null} key={formData?.TerminateDate} onChange={(e) => handlerOnChnage(e, 'TerminateDate')} />
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 text-sm">
//             <label htmlFor="SigningDate" className="text-gray-500 text-[14px]">
//               Signing Date
//             </label>
//             <div className="">
//               <DatePicker name="SigningDate" value={formData?.SigningDate} key={formData?.SigningDate} onChange={(e) => handlerOnChnage(e, 'SigningDate')} />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 text-sm">
//             <label htmlFor="Code" className="text-gray-500 text-[14px]">
//               Description
//             </label>
//             <div className="">
//               <TextField
//                 size="small"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 name="Description"
//                 className="w-full "
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
