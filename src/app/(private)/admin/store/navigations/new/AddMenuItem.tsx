"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCollectionsQuery } from "@/store/api/collection-api";
import { SelectContent } from "@radix-ui/react-select";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const initialData = {
  name: "",
  collection: "",
  link: "",
};

type MenuItem = typeof initialData;

type AddMenuItemProps = {
  isOpen: boolean;
  setIsOpen: () => {};
  setMenu?: MenuItem[];
  menu?: MenuItem[];
};

const AddMenuItem = ({ isOpen, setIsOpen, setMenu }: AddMenuItemProps) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [tabSegment, setTabSegment] = useState("collection");

  const { data: collectionsData } = useGetCollectionsQuery({});

  const onClose = () => {
    setIsOpen(false);
    setData(initialData);
    setError(initialData);
  };

  const handleAddItem = () => {
    const errorMessages = {};

    if (!data.name) {
      errorMessages.name = "Name is required";
    }

    if (tabSegment === "collection" && !data.collection) {
      errorMessages.collection = "Collection is required";
    }

    if (tabSegment === "link" && !data.link) {
      errorMessages.link = "Link is required";
    }

    if (Object.keys(errorMessages).length > 0) {
      return setError(errorMessages);
    } else {
      setError(initialData);

      if (tabSegment === "collection") {
        const newItem = {
          id: uuidv4(),
          label: data.name,
          handle: `/collections/${data.collection}`,
          children: [],
        };
        setMenu((prev) => [...prev, newItem]);
      } else {
        const newItem = {
          id: uuidv4(),
          label: data.name,
          handle: `/pages/${data.link}`,
          children: [],
        };
        setMenu((prev) => [...prev, newItem]);
      }
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Menu</SheetTitle>
          <SheetDescription>Add New Menu Item</SheetDescription>
        </SheetHeader>
      </SheetContent>
      <SheetContent>
        <div className="space-y-16">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                required
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                value={data.name}
                name="name"
                placeholder="e.g. Home"
                className=""
              />
            </FormControl>
            <FormMessage>{error.name}</FormMessage>
          </FormItem>
          <Tabs defaultValue="collection" className="w-full space-y-8">
            <TabsList className="w-full py-4">
              <TabsTrigger
                value="collection"
                className="w-full"
                onClick={() => setTabSegment("collection")}
              >
                Collection
              </TabsTrigger>
              <TabsTrigger
                value="link"
                className="w-full"
                onClick={() => setTabSegment("link")}
              >
                Link
              </TabsTrigger>
            </TabsList>
            <TabsContent value="collection">
              <FormItem className="w-full">
                <FormLabel htmlFor={"collection"}>Select Collection</FormLabel>
                <Select
                  value={data.collection}
                  onValueChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      collection: e,
                    }))
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a collection"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[21rem] bg-slate-200 rounded-lg dark:bg-black">
                    {collectionsData?.data.map((option) => (
                      <SelectItem
                        key={option.handle}
                        value={option.handle}
                        className="cursor-pointer"
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  If you can&apos;t find a collection, let&apos;s go to add that
                  collection in the collection here {" > "}
                  <Link
                    className="underline"
                    href={"/admin/products/collections/new"}
                  >
                    Go to Collections
                  </Link>
                </FormDescription>

                <FormMessage>{error.collection}</FormMessage>
              </FormItem>
            </TabsContent>
            <TabsContent value="link">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    value={data.link}
                    name="link"
                    className="p-4 border-2 rounded-lg"
                    placeholder="/home"
                  />
                </FormControl>
                <FormMessage>{error.link}</FormMessage>
              </FormItem>
            </TabsContent>
          </Tabs>
          <Button className="w-full" onClick={handleAddItem}>
            Add Menu Item
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddMenuItem;
