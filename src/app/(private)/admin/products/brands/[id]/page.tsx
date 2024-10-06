"use client";
import BrandForm from "@/components/admin/forms/brand-form";
import CollectionForm from "@/components/admin/forms/collection-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetBrandQuery } from "@/store/api/brand-api";
import { useGetCollectionQuery } from "@/store/api/collection-api";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditCollection = (props: Props) => {
  const { id } = props.params;

  const { data, isLoading } = useGetBrandQuery({ id: id });

  console.log(data);

  return (
    <AddPageLayout pathname="/products/brands/edit" title="Edit Brand">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <BrandForm data={data?.data} action="update" />
      )}
    </AddPageLayout>
  );
};

export default AdminEditCollection;
