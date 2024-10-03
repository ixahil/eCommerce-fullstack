"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "./actions";
import Image from "next/image";

export type Product = {
  _id: string;
  name: string;
  sku: string;
  description: string;
  collections: {};
  brand: {};
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
    accessorKey: "mainImage",
    header: "Image",
    cell: ({ cell, row }) => {
      const mainImage = cell.getValue() as { url: string };
      const image = mainImage.url;
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

export const products: Product[] = [
  {
    id: "id123",
    name: "sample",
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    id: "id123",
    name: "sample",
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
  {
    id: "id123",
    name: "sample",
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  },
];
