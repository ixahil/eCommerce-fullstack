import BrandForm from "@/components/admin/forms/brand-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";

const AddProduct = () => {
  return (
    <AddPageLayout pathname="products/brands/new" title="Add Brand">
      <BrandForm action="create" />
    </AddPageLayout>
  );
};

export default AddProduct;
