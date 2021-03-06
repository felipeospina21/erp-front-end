import { createApi } from '@reduxjs/toolkit/query/react';
import type { DocumentId } from './clientApi';
import { axiosBaseQuery } from './customBaseQuery';
import { HYDRATE } from 'next-redux-wrapper';
import { StockFormValues } from '@/components/Products/StockForm/StockForm';
export interface Product extends DocumentId {
  category: { _id: string; name: string };
  name: string;
  price: number;
  stock: number;
  image?: string;
}

export interface UpdateStock extends DocumentId {
  stock: number;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/products`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => ({ url: '/', method: 'GET' }),
      providesTags: [{ type: 'Product' }],
    }),
    updateProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: '/',
        method: 'put',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    updateProductStock: build.mutation<Product, UpdateStock>({
      query: (body) => ({
        url: '/updateStock',
        method: 'put',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    updateProductStockInBatch: build.mutation<{ message: string }, StockFormValues>({
      query: (body) => ({
        url: '/updateStockInBatch',
        method: 'put',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    deleteProduct: build.mutation<Product, DocumentId>({
      query: (body) => ({
        url: '/',
        method: 'DELETE',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    createProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useUpdateProductStockMutation,
  useUpdateProductStockInBatchMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  util: { getRunningOperationPromises: getProductRunningOperationPromises },
} = productApi;

export const {
  getProducts,
  updateProduct,
  updateProductStock,
  updateProductStockInBatch,
  deleteProduct,
  createProduct,
} = productApi.endpoints;
