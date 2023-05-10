import FormCard from '@/components/card/FormCard';
import MUITextField from '@/components/input/MUITextField';
import CitySelect from '@/components/selectbox/City';
import CountrySelect from '@/components/selectbox/Country';
import { Button, Checkbox, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import MaterialReactTable from "material-react-table";
import { AiOutlineDelete } from 'react-icons/ai';
import shortid from 'shortid';

export interface ICompartementFormProps {
  data: any,
  edit: boolean,
  handlerChangeItem: (record: any) => void;
}

export default function Compartement({ data, edit, handlerChangeItem }: ICompartementFormProps) {
  const [compartement, setCompartement] = useState<any>([{ ...data }])

console.log(compartement);

  const handleChange = (id: string, name: string, value: any) => {
    setCompartement((e:any) => {
      const index = e.findIndex((record: any) => record.id === id);
      const updatedRecord = {
        ...e[index],
        [name]: value
      };
      const updatedCompartement = [
        ...e.slice(0, index),
        updatedRecord,
        ...e.slice(index + 1)
      ];
      console.log(updatedCompartement);
      
      return updatedCompartement;

    });
  };

  const add = () => {
    const data = {
      id:shortid.generate(),
      u_VEHCOMPNO: null,
      u_VEHCOMPVO: null,
      u_VEHCOMPHA: null
    }
        setCompartement([...compartement, data]);    

  console.log(compartement);
  
  };


  const handlerDeleteItem = (id: string) => {
    setCompartement((e: any) => {
      // Check if there's more than 1 record
      if (e.length > 1) {
        const newRecord = e.filter((record: any) => record.id !== id);
        return newRecord;
      } else {
        // If there's only 1 record, return the current state without deleting the item
        return e;
      }
    });

  };

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "Action",
        header: "",
        size: 40,
        enableResizing: false,
        Cell: (cell: any) => {
          return (
            <div role="button" className="flex justify-center items-center">
              <button
                type="button"
                className="border border-gray-200 p-1 rounded-sm"
                onClick={() => handlerDeleteItem(cell?.row?.original?.id)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: "u_VEHCOMPNO",
        header: "Number", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          // return ;
          return <MUITextField
            value={cell.getValue()}
            // type='number'
            name="U_VEHCOMPNO"
            onChange={(event) => {
              const value = event.target.value;
              handleChange(cell.row.original.id, "u_VEHCOMPNO", value);
            }}
          />;
        },
      },

      {
        accessorKey: "u_VEHCOMPVO",
        header: "Volumn",
        Cell: ({ cell }: any) => <MUITextField
          value={cell.getValue()}
          name="U_VEHCOMPVO"
          onChange={(event) => {
            const value = event.target.value;
            handleChange(cell.row.original.id, "u_VEHCOMPVO", value);
          }}
        />
      },
      {
        accessorKey: "u_VEHCOMPHA",
        header: "	No. of Hatch",
        Cell: ({ cell }: any) => {

          return <MUITextField
            value={cell.getValue()}
            // type="number"
            name="U_VEHCOMPHA"
            onChange={(event) => {
              const value = event.target.value;
              handleChange(cell.row.original.id, "u_VEHCOMPHA", value);
            }}
          />;
        },
      },

    ],
    []
  );




  return (
    <FormCard title='Compartement'>
      <div className="col-span-2 data-table">
        <MaterialReactTable
          columns={columns}
          data={compartement ?? []}
          enableHiding={true}
          initialState={{ density: "compact" }}
          enableDensityToggle={false}
          enableColumnResizing
          enableStickyHeader={true}
          enableStickyFooter={true}
          enablePagination={true}
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 15],
          }}
          onPaginationChange={setPagination}
          state={{
            pagination,
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return <div className="flex gap-2 mb-6 pt-2 justify-center items-center">
              {!data?.isApproved ?
                <>
                  <Button variant="outlined" size="small"
                    onClick={()=>add()}
                  ><span className="text-xs  capitalize font-normal">+ Add New</span></Button>
                </>
                : null}

            </div>
          }}
        />
      </div>
    </FormCard>
  )
}