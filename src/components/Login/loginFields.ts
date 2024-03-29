import { InputField } from '@/components/Shared/Forms';

export const loginFields: InputField[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'name@email.com',
    label: 'Email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: '',
    label: 'Password',
    required: true,
  },
];
