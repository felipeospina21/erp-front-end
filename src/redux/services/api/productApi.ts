import { api } from './api';
import type { DocumentId } from './clientApi';
import { StockFormValues } from '@/components/Products/StockForm/StockForm';
export interface Product extends DocumentId {
  category: { _id: string; name: string };
  name: string;
  price: number;
  stockAvailable: number;
  stockReserved: number;
  image?: string;
}

export interface UpdateStockAvailable extends DocumentId {
  quantity: number;
}

export interface UpdateStockReserved extends DocumentId {
  stockReserved: number;
  method: 'add' | 'substract';
}

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => ({ url: '/products', method: 'GET' }),
      providesTags: [{ type: 'Product' }],
    }),
    updateProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: '/products',
        method: 'put',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    updateProductStockAvailable: build.mutation<Product, UpdateStockAvailable>({
      query: (body) => ({
        url: '/products/updateStockAvailable',
        method: 'put',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    updateProductStockReserved: build.mutation<Product, UpdateStockReserved>({
      query: (body) => ({
        url: '/products/updateStockReserved',
        method: 'put',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    updateProductStockInBatch: build.mutation<{ message: string }, StockFormValues>({
      query: (body) => ({
        url: '/products/updateStockInBatch',
        method: 'put',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    deleteProduct: build.mutation<Product, DocumentId>({
      query: (body) => ({
        url: '/products',
        method: 'DELETE',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    createProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: '/products',
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
  useUpdateProductStockAvailableMutation,
  useUpdateProductStockReservedMutation,
  useUpdateProductStockInBatchMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  util: { getRunningOperationPromises: getProductRunningOperationPromises },
} = productApi;

export const {
  getProducts,
  updateProduct,
  updateProductStockAvailable,
  updateProductStockReserved,
  updateProductStockInBatch,
  deleteProduct,
  createProduct,
} = productApi.endpoints;
