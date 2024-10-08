"use client";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { collectionFormControls } from "@/config/form/forms-data";
import { useGetCollectionQuery } from "@/store/api/collection-api";
import EditBrand from "./EditCollection";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditCollection = (props: Props) => {
  const { id } = props.params;
  const { data, isLoading, isError } = useGetCollectionQuery({ id: id });

  return (
    <AddPageLayout
      pathname="/products/collections/edit"
      title="Edit Collection"
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div>Internal Server Error</div>
      ) : (
        data?.data && (
          <EditBrand formControls={collectionFormControls} data={data.data} />
        )
      )}
    </AddPageLayout>
  );
};

export default AdminEditCollection;
