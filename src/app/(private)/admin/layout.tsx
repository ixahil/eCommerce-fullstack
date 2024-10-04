"use client";

import { Header } from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = (props: Props) => {
  const sidebar = { isOpen: true };

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
        )}
      >
        <Header title="test" />
        <div className="bg-dashboard-bg p-6 min-h-[calc(100vh_-_56px)]">
          <div className="bg-white min-h-[calc(100vh_-_56px)] rounded-2xl p-8">
            {props.children}
          </div>
        </div>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300 bg-dashboard-bg p-6",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
        )}
      >
        <div className="bg-white rounded-2xl p-8">Footer</div>
      </footer>
    </>
  );
};

export default AdminLayout;
