"use client";
import CommonForm from "@/components/admin/forms/common-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import { Form } from "@/components/ui/form";
import { productFormControls } from "@/config/form/forms-data";
import { useGetBrandsQuery } from "@/store/api/brand-api";
import { useGetCollectionsQuery } from "@/store/api/collection-api";
import { useAddProductMutation } from "@/store/api/product-api";
import { Brand, Collection } from "@/types/product";
import { submitHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be greater than 3 char"),
  description: z.string(),
  price: z.number(),
  salePrice: z.number(),
  images: z.array(z.union([z.instanceof(File), z.string()])),
  brand: z.string().min(1, "Brand must be selected"),
  collections: z.string().min(1, "Collection must be selected"),
  stock: z.number(),
  sku: z.string().min(3, "SKU must be greater than 3 char"),
  status: z.string(),
  pageTitle: z.string(),
  handle: z.string(),
  metaDescription: z.string(),
});

export type FormFields = z.infer<typeof formSchema>;

interface BrandResponse {
  data: { data: Brand[] };
  isError: boolean;
}

interface CollectionResponse {
  data: { data: Collection[] };
  isError: boolean;
}

const AddProduct = () => {
  const router = useRouter();
  const [addProductMutation] = useAddProductMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      collections: "",
      name: "",
      description: "",
      stock: 0,
      sku: "",
      images: [],
      status: "ACTIVE",
      pageTitle: "",
      handle: "",
    },
  });

  const { data: brandsData, isError: isBrandError } =
    useGetBrandsQuery<BrandResponse>({});
  const { data: collectionsData, isError: isCollectionError } =
    useGetCollectionsQuery<CollectionResponse>({});

  const options = {
    brand:
      brandsData?.data.map((brand) => ({
        handle: brand.handle,
        label: brand.name,
      })) || [],

    collections:
      collectionsData?.data?.map((collection) => ({
        handle: collection.handle,
        label: collection.name,
      })) || [],

    status: [
      { handle: "DRAFT", label: "Draft" },
      { handle: "ACTIVE", label: "Active" },
    ],
  };

  // Useeffect setting the errors for collections and brands
  useEffect(() => {
    if (isBrandError) {
      form.setError("brand", {
        message: "Internal Server Error in Fetching Brands, Try Again!",
      });
    }
    if (isCollectionError) {
      form.setError("collections", {
        message: "Internal Server Error in Fetching Collections, Try Again!",
      });
    }
  }, [isBrandError, isCollectionError, form]);

  // useeffect for setting the handle from name
  const changeForMeta = form.watch(["name", "description"]);
  useEffect(() => {
    const pageTitle = form.getValues("name");
    const metaDescription = form.getValues("description");

    form.setValue("pageTitle", pageTitle);

    form.setValue("handle", pageTitle);

    form.setValue("metaDescription", metaDescription);
  }, [changeForMeta, form]);

  const updatedFormControls = productFormControls.map((formGroup) => ({
    ...formGroup,
    children: formGroup.children.map((formItem) => ({
      ...formItem,
      items: formItem.items.map((item) => {
        if (item.name === "collections") {
          return { ...item, options: options.collections };
        }
        if (item.name === "brand") {
          return { ...item, options: options.brand };
        }
        if (item.name === "status") {
          return { ...item, options: options.status };
        }
        return item; // Return the original item if no conditions match
      }),
    })),
  }));

  const onSubmit = async (values: FieldValues) => {
    const { success, error } = await submitHandler(
      values,
      addProductMutation,
      form.setError
    );

    if (success) {
      router.back();
    } else {
      console.error("Submission failed:", error);
    }
  };

  return (
    <AddPageLayout title="Add Product" pathname="/products/new">
      <Form {...form}>
        <CommonForm onSubmit={onSubmit} formControls={updatedFormControls} />
      </Form>
    </AddPageLayout>
  );
};

export default AddProduct;
