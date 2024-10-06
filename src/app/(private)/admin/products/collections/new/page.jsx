import CollectionForm from "@/components/admin/forms/collection-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";

const AddProduct = () => {
  return (
    <AddPageLayout pathname="/products/collections/new" title="Add Collection">
      <CollectionForm action="create" />
    </AddPageLayout>
  );
};

export default AddProduct;
