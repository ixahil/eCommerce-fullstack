"use client";
import { Button } from "@/components/ui/button";
import NavigationMenu from "./menu";
import { LogOut, PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarToggle } from "./sidebar-toggle";
import Link from "next/link";
import { adminSiteConfig } from "@/config/adminSite";
import { selectSidebar } from "@/store/slice/sidebar-slice";
import { useAppSelector } from "@/store/hooks";

const Sidebar = () => {
  const { isOpen } = useAppSelector(selectSidebar);

  return (
    <aside
      className={cn(
        "bg-dashboard-bg dark:bg-[#09090B] fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !isOpen ? "w-[90px]" : "w-64"
      )}
    >
      <SidebarToggle />
      {/* <div className="flex flex-col w-full h-full">
        <Menu isOpen={isOpen} />
        <div className="w-full grow flex items-end">
          <Button variant="outline" className="w-full justify-center h-10 mt-5">
            <span className={cn(!isOpen ? "" : "mr-4")}>
              <LogOut size={18} />
            </span>
            <p
              className={cn(
                "whitespace-nowrap",
                !isOpen ? "opacity-0 hidden" : "opacity-100"
              )}
            >
              Sign out
            </p>
          </Button>
        </div>
      </div> */}
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !isOpen ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/admin" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !isOpen
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              {adminSiteConfig.logo}
            </h1>
          </Link>
        </Button>
        <NavigationMenu isOpen={isOpen} />
        <div className="w-full flex items-end">
          <Button variant="outline" className="w-full justify-center h-10 mt-5">
            <span className={cn(!isOpen ? "" : "mr-4")}>
              <LogOut size={18} />
            </span>
            <p
              className={cn(
                "whitespace-nowrap",
                !isOpen ? "opacity-0 hidden" : "opacity-100"
              )}
            >
              Sign out
            </p>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

// Rest of the code remains the same
