"use client";

import PageLayout from "@/components/admin/layouts/page-layout";
import { DataTable } from "@/components/shared/data-table";
import LoadingSkeleton from "@/components/shared/skeleton/loading-skeleton";
import { useGetMenusQuery } from "@/store/api/menu-api";
import React, { useState } from "react";
import { menuColumns } from "../../products/columns";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import CustomSelect from "@/components/ui/custom-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  useGetSiteConfigQuery,
  useUpdateStoreConfigMutation,
} from "@/store/api/storeConfig-api";

const StoreNavigations = () => {
  const { data, isLoading, isError } = useGetMenusQuery({});
  const {
    data: siteConfigData,
    isLoading: isSiteConfigLoading,
    isError: isSiteConfigError,
  } = useGetSiteConfigQuery({});
  return (
    <PageLayout
      search={true}
      title={"View Menus"}
      pathname="/store/navigations"
      button={{ label: "Add Menu", href: "navigations/new" }}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError || isSiteConfigError ? (
        <div className="text-destructive">Internal Server Error</div>
      ) : (
        <>
          <DataTable
            data={data?.data || []}
            columns={menuColumns}
            isError={isError}
          />
          {isSiteConfigLoading ? (
            <LoadingSkeleton />
          ) : (
            <MenuViewer data={data.data} defaultData={siteConfigData?.data} />
          )}
        </>
      )}
    </PageLayout>
  );
};

type MenuData = {
  name: string;
  handle: string;
  menu: MenuItem[]; // Use the MenuItem type for the menu array
};

type MenuViewerProps = {
  data: MenuData[]; // Array of menu data
};

type SelectOption = {
  handle: string; // Unique identifier for the option
  label: string; // Display label for the option
};

type SubMenuItem = {
  id: string;
  label: string;
  handle: string;
  children: SubMenuItem[];
};

type MenuItem = {
  label: string;
  handle: string;
  children: SubMenuItem[];
  _id: string;
};

type MenuProps = {
  data: {
    menu: MenuItem[];
  } | null;
};

// MenuViewer component
const MenuViewer: React.FC<MenuViewerProps> = ({ data, defaultData }) => {
  // Create options for the select dropdown
  const options: SelectOption[] = data.map((item) => ({
    handle: item.handle,
    label: item.name,
  }));

  // State to manage the selected menu
  const [selectMainMenu, setSelectMainMenu] = useState<string>(
    defaultData?.mainMenu.handle || ""
  );
  const [selectFooterMenu, setSelectFooterMenu] = useState<string>(
    defaultData?.footerMenu.handle || ""
  );
  const [error, setError] = useState<string>("");

  const [mutateStoreConfig] = useUpdateStoreConfigMutation({});

  // Get the selected menu item based on the selected handle
  const selectedMainMenu =
    data.find((item) => item.handle === selectMainMenu) || null;
  const selectedFootermenu =
    data.find((item) => item.handle === selectFooterMenu) || null;

  const handleSubmitSelect = () => {
    if (!selectedMainMenu || !selectedFootermenu) {
      setError("Please select both the main menu and footer menu");
    } else {
      setError("");
      const payload = {
        mainMenu: selectedMainMenu._id,
        footerMenu: selectedFootermenu._id,
      };

      console.log("payload", payload);
      mutateStoreConfig({
        payload: payload,
      });
    }
  };

  return (
    <PageLayout search={false} title="Select Menus">
      <div className="flex flex-col items-center justify-center gap-16">
        <div className="flex w-full items-end justify-between px-16">
          <div className="">
            <div className="flex items-center gap-8">
              <div className="w-full space-y-4">
                <Label htmlFor="menu">Main Menu</Label>
                <Select
                  onValueChange={setSelectMainMenu}
                  value={selectMainMenu}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Menu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Menu</SelectLabel>
                      {options.map((option) => (
                        <SelectItem key={option.handle} value={option.handle}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full space-y-4">
                <Label htmlFor="menu">Footer Menu</Label>
                <Select
                  onValueChange={setSelectFooterMenu}
                  value={selectFooterMenu}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Menu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Menu</SelectLabel>
                      {options.map((option) => (
                        <SelectItem key={option.handle} value={option.handle}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {error && <p className="my-2 text-destructive">{error}</p>}
          </div>

          <Button onClick={handleSubmitSelect}>Submit Selected Menus</Button>
        </div>
        <div className="w-full">
          <h6 className="text-left bg-gray-200 dark:text-black p-2 rounded-lg">
            Selected Main Menu
          </h6>
          <Menu data={selectedMainMenu} />
        </div>
        <div className="w-full">
          <h6 className="text-left bg-gray-200 p-2 rounded-lg dark:text-black">
            Selected Footer Menu
          </h6>
          <Menu data={selectedFootermenu} />
        </div>
      </div>
    </PageLayout>
  );
};

// Recursive function to render menu items and their submenus
const renderMenuItems = (items: MenuItem[]) => {
  return items.map((item) => (
    <li key={item.handle} className="group">
      <span className="text-white bg-gray-800 p-4 rounded-lg hover:text-gray-300 cursor-pointer">
        {item.label}
      </span>
      {item.children && item.children.length > 0 && (
        <ul className="absolute left-0 mt-4 hidden group-hover:block bg-gray-700 rounded-lg w-full">
          {item.children.map((subItem) => (
            <li
              key={subItem.id}
              className="text-white p-2 rounded-lg hover:text-gray-300"
            >
              {subItem.label}
            </li>
          ))}
        </ul>
      )}
    </li>
  ));
};

const Menu: React.FC<MenuProps> = ({ data }) => {
  return (
    <nav className="p-4 m-4 w-full flex justify-center">
      <ul className="flex gap-8 relative">
        {data && data.menu.length > 0 ? (
          renderMenuItems(data.menu)
        ) : (
          <li className="text-white">No menu selected</li>
        )}
      </ul>
    </nav>
  );
};

export default StoreNavigations;
