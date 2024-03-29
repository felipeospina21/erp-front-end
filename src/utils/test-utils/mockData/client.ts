import { Client } from '@/redux/services';

export const clientMock: Client = {
  _id: 'asdfkj',
  addres1: 'calle 1',
  addres2: 'calle 2',
  city: 'medellin',
  department: 'antioquia',
  discount: 10,
  email: 'email@email.com',
  idNumber: '123456890',
  idType: 'nit',
  name: 'test client',
  paymentTerm: '15',
  retailer: true,
};

export const clients: Client[] = [
  {
    _id: 'afkj',
    addres1: 'calle 1',
    addres2: 'calle 2',
    city: 'medellin',
    department: 'antioquia',
    discount: 10,
    email: 'email@email.com',
    idNumber: '123456890',
    idType: 'nit',
    name: 'test client',
    paymentTerm: '15',
    retailer: true,
  },
  {
    _id: 'zxcvaronpp',
    addres1: 'calle 1',
    addres2: 'calle 2',
    city: 'medellin',
    department: 'antioquia',
    discount: 10,
    email: 'email@email.com',
    idNumber: '99999999',
    idType: 'nit',
    name: 'test client 2',
    paymentTerm: '15',
    retailer: true,
  },
];
