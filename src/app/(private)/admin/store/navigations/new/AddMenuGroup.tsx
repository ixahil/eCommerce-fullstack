"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import AddMenuItem from "./AddMenuItem";
import { MinimalViable } from "@/components/shared/sortable-tree";

const AddMenuGroup = () => {
  const { formState, setValue, getValues } = useFormContext();
  const [menu, setMenu] = useState(getValues("menu"));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setValue("menu", menu);
  }, [menu]);

  return (
    <>
      <div className="w-full space-y-4">
        {menu.length > 0 ? (
          <MinimalViable data={menu} setData={setMenu} />
        ) : (
          <div
            className={`w-[90%] dark:bg-zinc-900 h-20 border-2 rounded-lg flex items-center m-auto ${
              formState.errors.menuItems && "border-red-500"
            }`}
          >
            <p className="text-center font-semibold text-gray-500 m-auto  ">
              This menu is empty
            </p>
          </div>
        )}
        <Button
          className="w-full"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="mr-2 h-5" />
          Add Menu
        </Button>
      </div>
      <AddMenuItem isOpen={isOpen} setIsOpen={setIsOpen} setMenu={setMenu} />
    </>
  );
};

export default AddMenuGroup;
