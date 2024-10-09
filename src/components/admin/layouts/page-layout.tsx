import React from "react";
import { TopBar } from "../top-bar";
import BreadCrumbCustom from "@/components/shared/breadcrumb-custom";

type Props = {
  children: React.ReactNode;
  title?: string;
  search: boolean;
  button?: {
    label: string;
    href: string;
  };
  pathname?: string;
};

const PageLayout = ({ children, button, search, title, pathname }: Props) => {
  return (
    <div className="space-y-8">
      {pathname && <BreadCrumbCustom pathname={pathname} />}
      <h2 className="text-xl font-medium">{title}</h2>
      {button && <TopBar button={button} search={search} />}
      {children}
    </div>
  );
};

export default PageLayout;
