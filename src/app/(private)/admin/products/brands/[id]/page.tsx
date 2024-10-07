"use client";
import BrandForm from "@/components/admin/forms/brand-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetBrandQuery } from "@/store/api/brand-api";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditCollection = (props: Props) => {
  const { id } = props.params;

  const { data, isLoading, isError } = useGetBrandQuery({ id: id });

  console.log(data);

  return (
    <AddPageLayout pathname="/products/edit" title="Edit Product">
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div>Internal Server Error</div>
      ) : (
        data?.data && <BrandForm data={data?.data} action="update" />
      )}
    </AddPageLayout>
  );
};

export default AdminEditCollection;
