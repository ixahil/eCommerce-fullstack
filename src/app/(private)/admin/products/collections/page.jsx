import PageLayout from "@/components/admin/layouts/page-layout";

const AdminCollectionList = async () => {
  // const response = await fetch(process.env.NEXT_PUBLIC_API + "api/v1/products");

  // const { data } = await response.json();

  return (
    <PageLayout
      search
      title={"View Collections"}
      pathname="/collections"
      button={{ label: "Add Collection", href: "collections/new" }}
    >
      {/* <DataTable data={data?.products} columns={columns} /> */}
    </PageLayout>
  );
};

export default AdminCollectionList;
