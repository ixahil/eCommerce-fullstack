"use client";
import CollectionForm from "@/components/admin/forms/collection-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetCollectionQuery } from "@/store/api/collection-api";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditCollection = (props: Props) => {
  const { id } = props.params;

  const { data, isLoading } = useGetCollectionQuery({ id: id });

  return (
    <AddPageLayout
      pathname="/products/collections/edit"
      title="Edit Collection"
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <CollectionForm data={data?.data} action="update" />
      )}
    </AddPageLayout>
  );
};

export default AdminEditCollection;
