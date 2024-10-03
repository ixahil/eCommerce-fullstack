import Sidebar from "@/components/admin/sidebar";
import { adminSiteConfig } from "@/config/adminSite";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = (props: Props) => {
  return (
    <div>
      <header>header</header>
      <div className="flex">
        <Sidebar items={adminSiteConfig.navItems} />
        <main>{props.children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
