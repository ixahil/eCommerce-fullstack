import PageLayout from "@/components/admin/layouts/page-layout";
import { DataTable } from "@/components/shared/data-table";
import React from "react";
import { columns, products } from "./columns";

const AdminProductList = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API + "api/v1/products");

  const { data } = await response.json();

  return (
    <PageLayout
      search
      title={"View Products"}
      pathname="/products"
      button={{ label: "Add Product", href: "products/new" }}
    >
      <DataTable data={data?.products} columns={columns} />
    </PageLayout>
  );
};

export default AdminProductList;
