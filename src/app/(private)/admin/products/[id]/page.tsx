"use client";
import ProductForm from "@/components/admin/forms/product-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetProductQuery } from "@/store/api/product-api";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditProduct = (props: Props) => {
  const { id } = props.params;

  const { data, isLoading, isError } = useGetProductQuery({ id: id });

  return (
    <AddPageLayout pathname="/products/edit" title="Edit Product">
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div>Internal Server Error</div>
      ) : (
        data?.data && <ProductForm data={data.data} action="update" />
      )}
    </AddPageLayout>
  );
};

export default AdminEditProduct;
