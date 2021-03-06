import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '@/redux/services';
import { RootState } from '@/redux/store';

export interface ClientsState {
  newClient: Client;
  status: string | undefined;
}

export interface NewClientPayload {
  field: string;
  value: string | number;
}

const initialState: ClientsState = {
  status: 'idle',
  newClient: {
    name: '',
    addres1: '',
    city: '',
    department: '',
    discount: 0,
    idNumber: '',
    idType: '',
    paymentTerm: '15',
    retailer: true,
  },
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    newClientData: (state, action: PayloadAction<NewClientPayload>) => {
      const { field, value } = action.payload;
      state.newClient = { ...state.newClient, [field]: value };
    },
    resetNewClientData: (state) => {
      state.newClient = initialState.newClient;
    },
  },
});

export const { newClientData, resetNewClientData } = clientsSlice.actions;
export const selectClients = (state: RootState): ClientsState => state.clients;
export default clientsSlice.reducer;
