"use client";

import PageLayout from "@/components/admin/layouts/page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetCollectionsQuery } from "@/store/api/collection-api";
import { collectionColumns } from "../columns";
import { DataTable } from "@/components/shared/data-table";

const AdminCollectionList = () => {
  // const response = await fetch(process.env.NEXT_PUBLIC_API + "api/v1/products");

  // const { data } = await response.json();

  const { data, isError, isLoading } = useGetCollectionsQuery({});

  return (
    <PageLayout
      search
      title={"View Collections"}
      pathname="/products/collections"
      button={{ label: "Add Collection", href: "collections/new" }}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable
          data={data?.data || []}
          columns={collectionColumns}
          isError={isError}
        />
      )}
    </PageLayout>
  );
};

export default AdminCollectionList;
