import { IconButton, Td, Tr, useToast } from '@chakra-ui/react';
import React from 'react';
import { MdClear } from 'react-icons/md';
import { useGetProductsQuery } from '@/redux/services';
import { numberToCurrency } from '@/utils/index';
import { InputCell, TableCellBody } from './';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addProductToList, updateProductsListItem } from '@/redux/slices/salesSlice';
import { CustomSelect } from '@/components/Shared';

export interface TableRowProps {
  id: string;
  deliveryId: number;
  removeRow: (id: string) => void;
}

export function TableRow({ id, removeRow, deliveryId }: TableRowProps): JSX.Element {
  const { data: products } = useGetProductsQuery();
  const deliveryCity = useAppSelector((state) => state.sales.checkoutData.deliveryCity);
  const bogotaShipping = useAppSelector((state) => state.shipping.bogota);
  const saleClient = useAppSelector((state) => state.sales.client);
  const deliveriesList = useAppSelector((state) => state.sales.deliveriesList);
  const product = deliveriesList[deliveryId].productsList.filter(
    (product) => product.rowId === id
  )[0];
  const toast = useToast();
  const dispatch = useAppDispatch();

  function calculateTotal(price = 0, quantity = 0, discount = 0, shipping = 0): number {
    const discountedPrice = price - price * (discount / 100);
    const grossSubTotal = (discountedPrice + shipping) * quantity;
    return grossSubTotal;
  }

  function calculateShipping(productId: string, deliveryCity: string): number {
    if (deliveryCity === 'Bogota') {
      return bogotaShipping[productId];
    }
    return 0;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;

    if (products) {
      const {
        _id,
        price,
        stockAvailable: stock,
        name: productId,
      } = products?.filter((product) => product.name === value)[0];
      const shipping = calculateShipping(_id, deliveryCity);
      const rowTotal = calculateTotal(price);
      const newProduct = {
        item: _id,
        rowId: id,
        stock,
        price,
        productId,
        rowTotal,
        discount: saleClient.discount,
        quantity: 0,
        shipping,
      };

      if (deliveriesList[deliveryId].productsList.length < 1) {
        dispatch(addProductToList({ deliveryId, rowData: newProduct }));
      } else {
        dispatch(updateProductsListItem({ deliveryId, newProduct }));
      }
    }
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, id: inputId } = event.target;
    if (product) {
      const { price, quantity, discount, stock, productId: name, shipping } = product;

      if (inputId === 'quantity') {
        const newQuantity = Number(value);

        if (newQuantity > stock) {
          toast({
            title: 'Inventario insuficiente',
            description: `La cantidad a vender de ${name} supera el inventario`,
            status: 'error',
            duration: 8000,
            isClosable: true,
          });
        }

        if (newQuantity >= 0) {
          const rowTotal = calculateTotal(price, newQuantity, discount, shipping);
          dispatch(
            updateProductsListItem({
              deliveryId,
              newProduct: { rowId: id, quantity: newQuantity, rowTotal },
            })
          );
        }
      }

      if (inputId === 'discount') {
        const newDiscount = Number(value);
        const rowTotal = calculateTotal(price, quantity, newDiscount);

        if (newDiscount >= 0) {
          dispatch(
            updateProductsListItem({
              deliveryId,
              newProduct: { rowId: id, discount: newDiscount, rowTotal },
            })
          );
        }
      }
    }
  }

  return (
    <Tr>
      <Td p="0" w={['170px', 'auto']} maxW="300px">
        <CustomSelect
          id={id.toString()}
          placeholder="Select option"
          onChangeFn={handleSelectChange}
          size="sm"
          borderRadius="md"
          options={products?.map((prod) => ({ _id: prod._id, name: prod.name }))}
        />
      </Td>

      <TableCellBody>{product?.stock.toLocaleString()}</TableCellBody>
      <TableCellBody>{numberToCurrency(product?.price ?? 0)}</TableCellBody>
      <TableCellBody>
        <InputCell
          id="quantity"
          handleInputChange={handleInputChange}
          textAlign="center"
          variant="outline"
          value={product?.quantity?.toLocaleString() ?? ''}
        />
      </TableCellBody>
      <TableCellBody>
        <InputCell
          id="discount"
          handleInputChange={handleInputChange}
          textAlign="center"
          variant="outline"
          value={
            product?.discount?.toLocaleString() ?? saleClient?.discount?.toLocaleString() ?? ''
          }
        />
      </TableCellBody>
      <TableCellBody id="shipping">{numberToCurrency(product?.shipping ?? 0)}</TableCellBody>
      <TableCellBody>{numberToCurrency(product?.rowTotal ?? 0)}</TableCellBody>
      <TableCellBody>
        <IconButton
          onClick={(): void => {
            removeRow(id);
          }}
          aria-label="eliminar fila"
          icon={<MdClear />}
          colorScheme="red"
          size="md"
          variant="ghost"
        />
      </TableCellBody>
    </Tr>
  );
}
