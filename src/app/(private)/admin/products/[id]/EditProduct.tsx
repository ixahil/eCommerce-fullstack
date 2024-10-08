"use client";
import CommonForm from "@/components/admin/forms/common-form";
import { Form } from "@/components/ui/form";
import { CommonFormGroup } from "@/config/form/forms-data";
import { useUpdateProductMutation } from "@/store/api/product-api";
import { Product } from "@/types/product";
import { submitHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  data?: Product;
  formControls: CommonFormGroup[];
};

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
  removedImages: z.array(z.string()),
});

export type FormFields = z.infer<typeof formSchema>;

const EditProduct = ({ formControls, data }: Props) => {
  const params = useParams();
  const router = useRouter();

  const [updateProductMutation] = useUpdateProductMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      sku: data?.sku || "",
      price: data?.price || 0,
      salePrice: data?.salePrice || 0,
      stock: data?.stock || 0,
      brand: data?.brand.handle || "",
      collections: data?.collections.handle || "",
      images: data?.images?.map((img: { url: string }) => img.url) || [],
      status: data?.status || "",
      pageTitle: data?.name || "",
      handle: data?.handle || "",
      removedImages: [],
    },
  });

  // Handle form submission
  const onSubmit = async (values: FieldValues) => {
    const { success, error } = await submitHandler(
      values,
      updateProductMutation,
      form.setError,
      params.id as string
    );

    if (success) {
      router.back();
    } else {
      console.error("Submission failed:", error);
    }
  };
  return (
    <Form {...form}>
      <CommonForm onSubmit={onSubmit} formControls={formControls} />
    </Form>
  );
};

export default EditProduct;
