import BreadCrumbCustom from "@/components/shared/breadcrumb-custom";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  pathname: string;
};

const AddPageLayout = ({ children, title, pathname }: Props) => {
  return (
    <div className="space-y-4 px-16 pb-8">
      <BreadCrumbCustom pathname={pathname} />
      <h2 className="text-xl font-medium">{title}</h2>
      {children}
    </div>
  );
};

export default AddPageLayout;
