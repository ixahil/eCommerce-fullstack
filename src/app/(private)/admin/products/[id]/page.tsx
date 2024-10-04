import ProductForm from "@/components/admin/forms/product-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import { Product } from "@/types/product";
import React from "react";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditProduct = async (props: Props) => {
  const { id } = props.params;

  const response = await fetch(
    process.env.NEXT_PUBLIC_API + "api/v1/products/" + id
  );

  const { data }: { data: Product[] } = await response.json();

  return (
    <AddPageLayout pathname="/products/edit" title="Edit Product">
      <ProductForm data={data} />
    </AddPageLayout>
  );
};

export default AdminEditProduct;
