"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./actions";
import Image from "next/image";
import Badges from "@/components/ui/badges";

export type Collection = {
  _id: string;
  name: string;
  handle: string;
  description: string | null;
  products: [string];
};

export type Product = {
  _id: string;
  name: string;
  sku: string;
  description: string;
  collections: Collection[];
  brand: Collection;
  price: number;
  stock: number;
  mainImage: {
    url: string;
    localPath: string;
  };
  isVisible: boolean;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ cell, row }) => {
      const thumbnail = cell.getValue() as { url: string };
      const image = thumbnail.url;
      return (
        <Image src={image} alt={row.original.name} width={50} height={50} />
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ getValue }) => {
      const collections = getValue() as Collection[];
      const collectionNames = collections.map((coll) => coll.name);
      return <Badges items={collectionNames} />;
    },
  },
  {
    accessorKey: "isVisible",
    header: "Visible",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return <RowAction product={product} />;
    },
  },
];
