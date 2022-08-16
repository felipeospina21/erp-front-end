import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { Clear } from '@/assets/icons';
import { IconButtonProps } from '../types';

export function CloseButton({
  isLoading,
  onClick,
  size = 'lg',
  color = 'black',
  variant = 'ghost',
}: IconButtonProps): JSX.Element {
  return (
    <>
      <IconButton
        aria-label="cerrar"
        icon={<Clear />}
        size={size}
        color={color}
        variant={variant}
        isLoading={isLoading}
        onClick={onClick}
        _focus={{ border: 'none' }}
      />
    </>
  );
}
