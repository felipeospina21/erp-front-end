import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DocumentId } from './clientApi';

export interface Product extends DocumentId {
  alias: string;
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
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/products`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => '/',
      providesTags: [{ type: 'Product' }],
    }),
    updateProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    updateProductStock: build.mutation<Product, UpdateStock>({
      query: (body) => ({
        url: '/updateStock',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    deleteProduct: build.mutation<Product, DocumentId>({
      query: (body) => ({
        url: '/',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    createProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useUpdateProductStockMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} = productApi;
