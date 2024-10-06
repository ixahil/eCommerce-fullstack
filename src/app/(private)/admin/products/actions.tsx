"use client";

import { Edit, Loader2, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Product } from "./columns";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteCollectionMutation } from "@/store/api/collection-api";
import { useDeleteProductMutation } from "@/store/api/product-api";
import { useState } from "react";
import { useDeleteBrandMutation } from "@/store/api/brand-api";

export const RowAction = ({
  item,
  actionType,
}: {
  item: Product;
  actionType: string;
}) => {
  const pathname = usePathname();

  const [deleteProductMutation] = useDeleteProductMutation();
  const [deleteCollectionMutation] = useDeleteCollectionMutation();
  const [deleteBrandMutation] = useDeleteBrandMutation();

  const [isLoading, setIsLoading] = useState(false);

  const deleteAction = async () => {
    setIsLoading(true);
    try {
      if (actionType === "product") {
        await deleteProductMutation({ id: item._id });
      } else if (actionType === "collection") {
        await deleteCollectionMutation({ id: item._id });
      } else if (actionType === "brand") {
        await deleteBrandMutation({ id: item._id });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <ConfirmationDialog deleteAction={deleteAction} isLoading={isLoading} />
      <Link href={`${pathname}/${item._id}`}>
        <Edit className="text-green-500 hover:text-green-600 transition duration-200 hover:scale-110 cursor-pointer" />
      </Link>
    </div>
  );
};

const ConfirmationDialog = ({ deleteAction, isLoading }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteAction();
    setOpen(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash className="text-destructive hover:text-red-600 transition duration-200 hover:scale-110 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" aria-disabled={isLoading}>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure to Delete? This won't be reverted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start flex gap-2 items-center w-full">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              size={"lg"}
              className="w-full"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            type="button"
            variant="destructive"
            size={"lg"}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
