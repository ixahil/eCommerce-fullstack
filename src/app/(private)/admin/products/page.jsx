"use client";
import PageLayout from "@/components/admin/layouts/page-layout";
import { DataTable } from "@/components/shared/data-table";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { useGetProductsQuery } from "@/store/api/product-api";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";

const AdminProductList = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <PageLayout
      search
      title={"View Products"}
      pathname="/products"
      button={{ label: "Add Product", href: "products/new" }}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable data={data?.data || []} columns={columns} />
      )}
    </PageLayout>
  );
};

export default AdminProductList;
