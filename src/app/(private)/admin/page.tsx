import GridCard from "@/components/grid-card";
import React from "react";

const AdminHome = () => {
  return (
    <div className="grid grid-flow-dense gap-6">
      <GridCard className="row-span-2 col-span-2" />
      <GridCard className="row-span-1 col-span-1" />
      <GridCard className="row-span-1 col-span-1" />
      <GridCard className="row-span-1 col-span-2" />
      <GridCard className="row-span-1 col-span-4" />
    </div>
  );
};

export default AdminHome;
