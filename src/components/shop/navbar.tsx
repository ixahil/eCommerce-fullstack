"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useGetSiteConfigQuery } from "@/store/api/storeConfig-api";
import Link from "next/link";
import LoadingSkeleton from "../shared/skeleton/loading-skeleton";

const MenuRenderer = ({ menuItem }) => {
  return (
    <MenubarMenu>
      <MenubarTrigger className="uppercase">
        {menuItem.children && menuItem.children.length > 0 ? (
          menuItem.label
        ) : (
          <Link href={menuItem.handle}>{menuItem.label}</Link>
        )}
      </MenubarTrigger>
      {menuItem.children && menuItem.children.length > 0 && (
        <MenubarContent>
          {menuItem.children.map((child) => (
            <MenubarItem key={child.id}>
              <Link href={child.handle}>{child.label}</Link>
            </MenubarItem>
          ))}
        </MenubarContent>
      )}
    </MenubarMenu>
  );
};

const Navbar = () => {
  const { data, isLoading, error } = useGetSiteConfigQuery({});

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Error loading menu</div>;
  }

  return (
    <Menubar className="bg-[#232F3E] text-white h-12 items-center justify-center gap-8 border-none rounded-none">
      {data?.data.mainMenu.menu.map((menuItem) => (
        <MenuRenderer key={menuItem.id} menuItem={menuItem} />
      ))}
    </Menubar>
  );
};

export default Navbar;
