"use client";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { brandFormControls } from "@/config/form/forms-data";
import { useGetMenuQuery } from "@/store/api/menu-api";
import EditMenu from "./EditMenu";

type Props = {
  params: {
    id?: string;
  };
};

const AdminEditMenu = (props: Props) => {
  const { id } = props.params;
  const { data, isLoading, isError } = useGetMenuQuery({ id: id });

  return (
    <AddPageLayout pathname="/store/navigations/edit" title="Edit Menu">
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div>Internal Server Error</div>
      ) : (
        data?.data && (
          <EditMenu formControls={brandFormControls} data={data.data} />
        )
      )}
    </AddPageLayout>
  );
};

export default AdminEditMenu;
