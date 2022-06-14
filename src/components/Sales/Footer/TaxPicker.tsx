import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateSalesData } from '@/redux/slices/salesSlice';
import { CustomSelect } from '@/components/Shared';
import { nanoid } from '@reduxjs/toolkit';
import { useAppSelector } from '@/redux/hooks';

const TaxPicker = (): JSX.Element => {
  const tax = useAppSelector((state) => state.sales.newSaleData.tax);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    const formatedValue = Number(value) / 100;
    dispatch(updateSalesData({ tax: formatedValue }));
  };
  return (
    <SimpleGrid columns={2} spacing={1} justifyItems="end" mt="1.5rem" w="100%">
      <Box textAlign="right" w="100%" fontWeight="500">
        IVA (%):
      </Box>
      <CustomSelect
        id="tax-picker"
        options={[
          { id: nanoid(), name: '0' },
          { id: nanoid(), name: '16' },
          { id: nanoid(), name: '19' },
        ]}
        size="sm"
        margin="0"
        maxW="8rem"
        placeholder="select"
        onChangeFn={handleChange}
        value={String(tax * 100)}
      />
    </SimpleGrid>
  );
};

export default TaxPicker;
