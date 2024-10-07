import PageLayout from "@/components/admin/layouts/page-layout";
import React from "react";

const StoreNavigations = () => {
  return (
    <PageLayout
      search
      title={"View Menus"}
      pathname="/store/navigations"
      button={{ label: "Add Menu", href: "navigations/new" }}
    >
      test
      {/* {isLoading ? (
    <LoadingSkeleton />
  ) : (
    <DataTable
      data={data?.data || []}
      columns={collectionColumns}
      isError={isError}
    />
  )} */}
    </PageLayout>
  );
};

export default StoreNavigations;
