"use client";
import PageLayout from "@/components/admin/layouts/page-layout";
import { DataTable } from "@/components/shared/data-table";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetProductsQuery } from "@/store/api/product-api";
import { productColumns } from "./columns";

const AdminProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

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
        <DataTable
          data={data?.data || []}
          columns={productColumns}
          isError={isError}
        />
      )}
    </PageLayout>
  );
};

export default AdminProductList;
