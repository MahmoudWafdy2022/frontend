import { apiSlice } from "./apiSlice";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder, token) => ({
    getProducts: builder.query({
      query: () => ({
        url: "https://backend-production-9647.up.railway.app/products/all",
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsPaginate: builder.query({
      query: () => ({
        url: "https://backend-production-9647.up.railway.app/products",
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId, token) => ({
        url: `https://backend-production-9647.up.railway.app/products/${productId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `https://backend-production-9647.up.railway.app/products`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `https://backend-production-9647.up.railway.app/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `https://backend-production-9647.up.railway.app/products/${id}`,
        method: "DELETE",
      }),
    }),
    getSellerProducts: builder.query({
      query: () => ({
        url: `https://backend-production-9647.up.railway.app/products/seller/all`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getSellerAcceptedProducts: builder.query({
      query: (id) => ({
        url: `https://backend-production-9647.up.railway.app/products/seller/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getSellerPendingProducts: builder.query({
      query: (id) => ({
        url: `https://backend-production-9647.up.railway.app/products/seller/pending/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `https://backend-production-9647.up.railway.app/uploads`,
        method: "POST",
        body: data,
      }),
    }),
    getBrands: builder.query({
      query: () => ({
        url: "https://backend-production-9647.up.railway.app/brands", // Adjust the URL accordingly
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getBrandDetails: builder.query({
      query: (brandId) => ({
        url: `https://backend-production-9647.up.railway.app/brands/${brandId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getCategory: builder.query({
      query: () => ({
        url: "https://backend-production-9647.up.railway.app/categories", // Adjust the URL accordingly
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `https://backend-production-9647.up.railway.app/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsPaginateQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetSellerAcceptedProductsQuery,
  useGetSellerPendingProductsQuery,
  useGetSellerProductsQuery,
  useUploadProductImageMutation,
  useGetBrandsQuery,
  useGetBrandDetailsQuery,
  useGetCategoryQuery,
  useGetCategoryDetailsQuery,
} = productsApiSlice;
