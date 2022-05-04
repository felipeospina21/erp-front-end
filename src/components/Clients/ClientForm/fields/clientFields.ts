import { Fields } from '@/components/Shared/Form';

export const clientFields: Fields[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'cliente',
    label: 'Cliente',
    required: true,
  },
  {
    name: 'idType',
    type: 'text',
    placeholder: 'tipo doc',
    label: 'Tipo Doc',
    required: true,
  },
  {
    name: 'idNumber',
    type: 'text',
    placeholder: 'doc',
    label: 'doc',
    required: true,
  },
  {
    name: 'addres1',
    type: 'text',
    placeholder: 'dirección 1',
    label: 'dirección 1',
    required: true,
  },
  {
    name: 'addres2',
    type: 'text',
    placeholder: 'dirección 2',
    label: 'dirección 2',
    required: false,
  },
  {
    name: 'city',
    type: 'text',
    placeholder: 'ciudad',
    label: 'ciudad',
    required: true,
  },
  {
    name: 'department',
    type: 'text',
    placeholder: 'departamento',
    label: 'departamento',
    required: true,
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'email',
    label: 'email',
    required: false,
  },
  {
    name: 'discount',
    type: 'number',
    placeholder: 'descuento',
    label: 'descuento',
    required: true,
  },
];
