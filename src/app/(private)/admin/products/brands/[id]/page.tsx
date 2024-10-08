"use client";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { brandFormControls } from "@/config/form/forms-data";
import { useGetBrandQuery } from "@/store/api/brand-api";
import EditBrand from "./EditBrand";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditBrand = (props: Props) => {
  const { id } = props.params;
  const { data, isLoading, isError } = useGetBrandQuery({ id: id });

  return (
    <AddPageLayout pathname="/products/brands/edit" title="Edit Brand">
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div>Internal Server Error</div>
      ) : (
        data?.data && (
          <EditBrand formControls={brandFormControls} data={data.data} />
        )
      )}
    </AddPageLayout>
  );
};

export default AdminEditBrand;
