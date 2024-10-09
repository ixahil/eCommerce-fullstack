"use client";

import { Header } from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { selectSidebar } from "@/store/slice/sidebar-slice";
import React from "react";
import { ThemeProviderAdmin } from "../theme-provider-admin";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = (props: Props) => {
  const { isOpen } = useAppSelector(selectSidebar);

  return (
    <ThemeProviderAdmin attribute="class" defaultTheme="dark" enableSystem>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-dashboard-bg dark:bg-[#09090B] transition-[margin-left] ease-in-out duration-300",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-64"
        )}
      >
        <Header title="Hola User" />
        <div className="bg-dashboard-bg dark:bg-[#09090B] p-6 min-h-[calc(100vh_-_56px)]">
          <div className="bg-dashboard-main-light dark:bg-dashboard-main-dark min-h-[calc(100vh_-_56px)] rounded-2xl p-8">
            {props.children}
          </div>
        </div>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300 bg-dashboard-bg dark:bg-[#09090B] p-6",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-64"
        )}
      >
        <div className="bg-dashboard-main-light dark:bg-dashboard-main-dark rounded-2xl p-8">
          Footer
        </div>
      </footer>
    </ThemeProviderAdmin>
  );
};

export default AdminLayout;
