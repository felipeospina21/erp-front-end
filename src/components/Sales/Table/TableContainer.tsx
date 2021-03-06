import {
  Button,
  Flex,
  Icon,
  Table,
  TableContainer as TableWrapper,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { TableCellHeader, TableRow } from './';
import { RowData } from '@/pages/ventas';
import { useAppDispatch } from '@/redux/hooks';
import { addProductToList, removeProductFromList } from '@/redux/slices/salesSlice';
import { nanoid } from '@reduxjs/toolkit';

export interface TableContainerProps {
  pageMaxW: string;
  header: {
    title: string;
    id: string;
  }[];
  rowsData: RowData[];
  setRowsData: (rowsData: RowData[]) => void;
  salesBtnDisabled: boolean;
  setSalesBtnDisabled: (salesBtnDisabled: boolean) => void;
}

export function TableContainer({
  pageMaxW,
  header,
  rowsData,
  setRowsData,
  salesBtnDisabled,
  setSalesBtnDisabled,
}: TableContainerProps): JSX.Element {
  const dispatch = useAppDispatch();

  const addRow = (): void => {
    salesBtnDisabled ? null : setSalesBtnDisabled(true);
    const newRow = {
      id: nanoid(),
      subtotal: 0,
      item: '',
      price: 0,
      stock: 0,
      quantity: 0,
      discount: 0,
      productId: '',
    };
    setRowsData([...rowsData, newRow]);
    dispatch(
      addProductToList({
        ...newRow,
        rowId: newRow.id,
        rowTotal: newRow.subtotal,
        name: newRow.productId,
      })
    );
  };

  const removeRow = (id: string): void => {
    const rowId = id;
    const idx = rowsData.findIndex(({ id }) => id === rowId);
    const newRows = rowsData.filter((row) => row.id !== rowId);
    setRowsData(newRows);
    dispatch(removeProductFromList(idx));
  };

  return (
    <Flex
      flexDir="column"
      align="flex-start"
      m={['2rem 2rem', null, null, null, null, '2rem auto']}
      w={[null, null, null, null, null, '95%']}
      maxW={pageMaxW}
      overflow="auto"
      bgColor="brand.bgLight"
      borderRadius="3xl"
      boxShadow={'var(--boxShadow)'}
    >
      <TableWrapper p="2rem 0" w="100%" display="flex" justifyContent="center">
        <Table variant="simple" w="90%" m={['auto']} colorScheme="blackAlpha">
          <Thead fontSize={['sm', 'md']}>
            <Tr>
              {header.map(({ title, id }) => {
                return <TableCellHeader key={id}>{title}</TableCellHeader>;
              })}
            </Tr>
          </Thead>
          <Tbody fontSize={['xs', 'sm']}>
            {rowsData.map((row) => {
              return <TableRow key={row.id} id={row.id ?? nanoid()} removeRow={removeRow} />;
            })}
          </Tbody>
        </Table>
      </TableWrapper>
      <Button
        variant="ghost"
        color="brand.green.600"
        size="sm"
        my="1rem"
        ml={[null, '1rem', '2rem', '4rem']}
        leftIcon={<Icon as={FaPlusCircle} />}
        onClick={addRow}
      >
        Row
      </Button>
    </Flex>
  );
}
