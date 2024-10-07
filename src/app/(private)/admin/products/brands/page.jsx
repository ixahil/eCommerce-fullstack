"use client";

import PageLayout from "@/components/admin/layouts/page-layout";
import { DataTable } from "@/components/shared/data-table";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetBrandsQuery } from "@/store/api/brand-api";
import { brandColumns } from "../columns";

const AdminCollectionList = () => {
  // const response = await fetch(process.env.NEXT_PUBLIC_API + "api/v1/products");

  // const { data } = await response.json();

  const { data, isError, isLoading } = useGetBrandsQuery();

  console.log(data);

  return (
    <PageLayout
      search
      title={"View Brands"}
      pathname="products/brands"
      button={{ label: "Add Brand", href: "brands/new" }}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable
          data={data?.data || []}
          columns={brandColumns}
          isError={isError}
        />
      )}
    </PageLayout>
  );
};

export default AdminCollectionList;
