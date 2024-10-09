"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./actions";
import Image from "next/image";
import Badges from "@/components/ui/badges";
import { Badge } from "@/components/ui/badge";

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

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ cell, row }) => {
      const images = cell.getValue() as { url: string; public_id: string }[];
      const firstImage = images[0]?.url;

      return firstImage ? (
        <Image
          src={firstImage}
          alt={row.original.name}
          width={50}
          height={50}
        />
      ) : (
        <span>No image available</span>
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
      const collection = getValue() as Collection;
      return <Badges items={collection?.name} />;
    },
  },
  {
    accessorKey: "isVisible",
    header: "Visible",
    cell: ({ getValue }) => {
      const isVisible = getValue() as boolean;
      return (
        <Badge variant={isVisible ? "success" : "destructive"}>
          {isVisible ? "Visible" : "Hidden"}
        </Badge>
      );
    },
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

      return <RowAction item={product} actionType="product" />;
    },
  },
];

export const collectionColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ cell, row }) => {
      const image = cell.getValue() as { url: string };
      return (
        image && (
          <Image
            src={image.url}
            alt={row.original.name}
            width={50}
            height={50}
          />
        )
      );
    },
  },
  {
    accessorKey: "handle",
    header: "Handle",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const isVisible = status === "ACTIVE";
      return (
        <Badge variant={isVisible ? "success" : "destructive"}>
          {isVisible ? "Visible" : "Hidden"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products Count",
    cell: ({ cell }) => {
      const productsCount = cell.getValue() as [];
      return <p className="text-start">{productsCount.length}</p>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return <RowAction item={product} actionType="collection" />;
    },
  },
];

export const brandColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ cell, row }) => {
      const image = cell.getValue() as { url: string };
      return (
        image && (
          <Image
            src={image.url}
            alt={row.original.name}
            width={50}
            height={50}
          />
        )
      );
    },
  },
  {
    accessorKey: "handle",
    header: "Handle",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const isVisible = status === "ACTIVE";
      return (
        <Badge variant={isVisible ? "success" : "destructive"}>
          {isVisible ? "Visible" : "Hidden"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products Count",
    cell: ({ cell }) => {
      const productsCount = cell.getValue() as [];
      return <p className="text-start">{productsCount.length}</p>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return <RowAction item={product} actionType="brand" />;
    },
  },
];

export const menuColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "handle",
    header: "Handle",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return <RowAction item={product} actionType="brand" />;
    },
  },
];
