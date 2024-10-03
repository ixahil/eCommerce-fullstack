"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { adminSiteConfig } from "@/config/adminSite";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MenuList } from "@/config/adminSite";
import { LogOut } from "lucide-react";
import { CollapseMenuButton } from "./collapse-menu-button";
import { ItemIndicator } from "@radix-ui/react-dropdown-menu";

type isOpen = boolean | undefined;

interface MenuProps {
  isOpen: isOpen;
}

interface MenuGroupProps {
  item: MenuList;
  isOpen: isOpen;
}

type MenuItemProps = { item: MenuList["menus"]; isOpen: isOpen };

const Menu = ({ isOpen }: MenuProps) => {
  const pathname = usePathname();
  const menuList = adminSiteConfig.getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col items-start space-y-1 px-2">
          {menuList.map((menuGroup, index) => (
            <MenuGroup item={menuGroup} key={index} isOpen={isOpen} />
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
};

const MenuGroup = ({ item, isOpen }: MenuGroupProps) => {
  return (
    <li className={cn("w-full", item.groupLabel ? "pt-5" : "")}>
      <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
        {item.groupLabel}
      </p>
      {item.menus.map((menuItem) => (
        <MenuItem item={menuItem} isOpen={isOpen} key={menuItem.label} />
      ))}
    </li>
  );
};

const MenuItem = ({ item, isOpen }: MenuItemProps) => {
  const { icon: Icon, active, href, label, submenus } = item;

  return !submenus || submenus.length === 0 ? (
    <Button
      variant={active ? "secondary" : "ghost"}
      className="w-full justify-start h-10 mb-1"
      asChild
    >
      <Link href={href}>
        <span className={cn(isOpen === false ? "" : "mr-4")}>
          <Icon size={18} />
        </span>
        <p
          className={cn(
            "max-w-[200px] truncate",
            isOpen === false
              ? "-translate-x-96 opacity-0"
              : "translate-x-0 opacity-100"
          )}
        >
          {label}
        </p>
      </Link>
    </Button>
  ) : (
    <div className="w-full" key={label}>
      <CollapseMenuButton
        icon={Icon}
        label={label}
        href={href}
        active={active}
        submenus={submenus}
        isOpen={isOpen}
      />
    </div>
  );
};

export default Menu;
