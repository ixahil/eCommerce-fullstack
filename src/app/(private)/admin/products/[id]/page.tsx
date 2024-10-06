"use client";
import ProductForm from "@/components/admin/forms/product-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetProductQuery } from "@/store/api/product-api";
import { Product } from "@/types/product";
import React from "react";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditProduct = (props: Props) => {
  const { id } = props.params;

  const { data, isLoading } = useGetProductQuery({ id: id });

  return (
    <AddPageLayout pathname="/products/edit" title="Edit Product">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <ProductForm data={data?.data} action="update" />
      )}
    </AddPageLayout>
  );
};

export default AdminEditProduct;
