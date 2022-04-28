import React from 'react';
import { Heading, Text, Flex } from '@chakra-ui/react';
import { thousandSeparator } from '../../../utils/utils';
import type { Product } from '../../../redux/services';

export interface CardProps {
  product: Product;
  locale?: string;
}

export function Card({ product, locale }: CardProps): JSX.Element {
  return (
    <Flex
      flexDir='column'
      align='center'
      justify='space-evenly'
      border='var(--border-100)'
      borderRadius='var(--borderRadius)'
      boxShadow={'var(--boxShadow)'}
      h='300px'
      w='300px'
      m='1rem'
      p='1rem'>
      <Heading as='h1' size='md'>
        {product.name.toLocaleUpperCase(locale)}
      </Heading>
      <Flex flexDir='column' align='flex-start' width='100%'>
        <Text mt='1rem' ml='1rem'>{`Stock: ${thousandSeparator(product.stock, 0)}`}</Text>
        <Text mt='1rem' ml='1rem'>{`Precio: $${thousandSeparator(product.price, 0)}`}</Text>
      </Flex>
    </Flex>
  );
}

export default Card;
