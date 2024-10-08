"use client";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { productFormControls } from "@/config/form/forms-data";
import { useGetBrandsQuery } from "@/store/api/brand-api";
import { useGetCollectionsQuery } from "@/store/api/collection-api";
import { useGetProductQuery } from "@/store/api/product-api";
import { Brand, Collection } from "@/types/product";
import EditProduct from "./EditProduct";

type Props = {
  params: {
    id?: string;
  };
};

interface BrandResponse {
  data: { data: Brand[] };
}

const AdminEditProduct = (props: Props) => {
  const { id } = props.params;

  const { data: productData, isLoading, isError } = useGetProductQuery({ id });
  const { data: collectionsData } = useGetCollectionsQuery<BrandResponse>({});
  const { data: brandsData } = useGetBrandsQuery<BrandResponse>({});

  const options = {
    brand:
      brandsData?.data.map((brand: Brand) => ({
        handle: brand.handle,
        label: brand.name,
      })) || [],
    collections:
      collectionsData?.data?.map((collection: Collection) => ({
        handle: collection.handle,
        label: collection.name,
      })) || [],
    status: [
      { handle: "DRAFT", label: "Draft" },
      { handle: "ACTIVE", label: "Active" },
    ],
  };

  // Update options in form controls
  const updatedFormControls = productFormControls.map((formGroup) => ({
    ...formGroup,
    children: formGroup.children.map((formItem) => ({
      ...formItem,
      items: formItem.items.map((item) => {
        if (item.name === "collections") {
          return { ...item, options: options.collections };
        }
        if (item.name === "brand") {
          return { ...item, options: options.brand };
        }
        if (item.name === "status") {
          return { ...item, options: options.status };
        }
        return item; // Return the original item if no conditions match
      }),
    })),
  }));

  return (
    <AddPageLayout pathname="/products/edit" title="Edit Product">
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div>Internal Server Error</div>
      ) : (
        productData?.data && (
          <EditProduct
            formControls={updatedFormControls}
            data={productData.data}
          />
        )
      )}
    </AddPageLayout>
  );
};

export default AdminEditProduct;
