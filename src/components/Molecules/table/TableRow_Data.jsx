import React from 'react';
import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';

const TableRow_Data = ({
   TableDataArray = [],
   TableDataClassName = '',
   TableRowClassName = '',
}) => {
   if (TableDataArray.length <= 0) {
      return (
         <h1 className='text-center text-white'>No data Found</h1>
      );
   }

   return (
      <TableRow Tailwind_utility_Class={TableRowClassName}>
         {TableDataArray.map((item, index) => (
            <TableData
               key={index}
               Tailwind_utility_Class={TableDataClassName}
            >
               {item}
            </TableData>
         ))}
      </TableRow>
   );
};

export default TableRow_Data;
