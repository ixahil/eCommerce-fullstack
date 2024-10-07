import MenuForm from "@/components/admin/forms/menu-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import React from "react";

const AddStoreNavigation = () => {
  return (
    <AddPageLayout title="Add Menu" pathname="/store/navigations/new">
      <MenuForm action="create" />
    </AddPageLayout>
  );
};

export default AddStoreNavigation;
