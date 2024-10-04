import ProductForm from "@/components/admin/forms/product-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";

const AddProduct = () => {
  return (
    <AddPageLayout pathname="/products/new" title="Add Product">
      <ProductForm action="create" />
    </AddPageLayout>
  );
};

export default AddProduct;
