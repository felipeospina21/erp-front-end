import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Button, Box, Icon } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import { toggle } from "../../app/slices/salesBtnSlice";
import TableRow from "./TableRow";
import TableCellHeader from "./TableCellHeader";
import { TableStylesProvider } from "../../context/TableStylesContext";

const TableContainer = ({ rowsData, setRowsData }) => {
  const dispatch = useDispatch();
  const salesBtn = useSelector(state => state.salesBtn);
  const [header, setHeader] = useState([
    "Producto",
    "Stock",
    "Precio",
    "Cantidad",
    "Descuento",
    "Total",
  ]);

  const addRow = () => {
    salesBtn ? null : dispatch(toggle(true));
    const newRowId = rowsData.length + 1;
    setRowsData([...rowsData, { id: newRowId.toString(), subtotal: 0 }]);
  };

  const removeRow = id => {
    const rowId = id;
    const newRows = rowsData.filter(row => row.id !== rowId);
    setRowsData(newRows);
  };

  return (
    <TableStylesProvider>
      <Box overflow='auto' mb='1rem'>
        <Table variant='simple' maxW='1300px' m={["auto"]} size={["sm", "md"]}>
          <Thead fontSize={["sm", "md"]}>
            <Tr>
              {header.map(text => {
                return <TableCellHeader key={text}>{text}</TableCellHeader>;
              })}
            </Tr>
          </Thead>
          <Tbody fontSize={["sm", "md"]}>
            {rowsData.map(row => {
              return (
                <TableRow
                  key={row.id}
                  id={row.id}
                  removeRow={removeRow}
                  rowsData={rowsData}
                  setRowsData={setRowsData}
                  rowData={row}
                />
              );
            })}
          </Tbody>
        </Table>
        <Button
          colorScheme='teal'
          size='sm'
          my='1rem'
          leftIcon={<Icon as={FaPlusCircle} />}
          onClick={addRow}>
          Row
        </Button>
      </Box>
    </TableStylesProvider>
  );
};

export default TableContainer;