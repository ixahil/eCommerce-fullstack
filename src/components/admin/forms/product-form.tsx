"use client";
import { Button } from "@/components/ui/button";
import { addProductFormControls } from "@/config/form/forms-data";
import { FormElemRenderer } from "@/utils/formElementRenderer";

import { Form } from "@/components/ui/form";
import { useGetBrandsQuery } from "@/store/api/brand-api";
import { useGetCollectionsQuery } from "@/store/api/collection-api";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/store/api/product-api";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";
import { isFetchBaseQueryError } from "@/store/utils";

// Define the schema for individual form items
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
  metaDescription: z.string(),
  handle: z.string(),
});

export type FormFields = z.infer<typeof formSchema>;

// Your form component
const ProductForm = ({ data, action }: { data: Product; action: string }) => {
  const params = useParams();
  const { data: brandsData, isError: isBrandError } = useGetBrandsQuery();
  const { data: collectionsData, isError: isCollectionError } =
    useGetCollectionsQuery();
  const [addProductMutation] = useAddProductMutation();
  const [updateProductMutation] = useUpdateProductMutation();

  const options = {
    brand: brandsData?.data.map((brand) => {
      return { handle: brand.handle, label: brand.name };
    }),
    collections: collectionsData?.data.map((collection) => {
      return { handle: collection.handle, label: collection.name };
    }),
    status: [
      { handle: "DRAFT", label: "Draft" },
      { handle: "ACTIVE", label: "Active" },
    ],
  };

  options.collections = collectionsData?.data.map((collection) => {
    return { handle: collection.handle, label: collection.name };
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: data?.brand?.handle || "",
      collections: data?.collections?.handle || "",
      name: data?.name || "",
      price: data?.price || 0,
      description: data?.description || "",
      salePrice: data?.salePrice || 0,
      stock: data?.stock || 0,
      sku: data?.sku || "",
      images: data?.images?.map((img: { url: string }) => img.url) || [],
      status: data?.status || "ACTIVE",
      pageTitle: data?.name || "",
      metaDescription: "",
      handle: data?.handle || "",
    },
  });

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
  }, [isBrandError, isCollectionError]);

  const changeForMeta = form.watch(["name", "description"]);

  useEffect(() => {
    const pageTitle = form.getValues("name");
    const metaDescription = form.getValues("description");

    // Only set values if they are different
    if (pageTitle !== form.formState.defaultValues?.pageTitle) {
      form.setValue("pageTitle", pageTitle);
      if (!form.getValues("handle")) {
        form.setValue("handle", pageTitle);
      }
    }
    if (metaDescription !== form.formState.defaultValues?.metaDescription) {
      form.setValue("metaDescription", metaDescription);
    }
  }, [changeForMeta, form]);

  const onSubmit: SubmitHandler<FormFields> = async (candidateData) => {
    const keepImage = data?.images.filter((img) =>
      candidateData.images.includes(img.url)
    );
    const formData = new FormData();
    formData.append("prevImages", JSON.stringify(keepImage));

    for (const key in candidateData) {
      if (candidateData.hasOwnProperty(key)) {
        const value = candidateData[key as keyof FormFields];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item);
            }
          });
        } else {
          formData.append(key, String(value));
        }
      }
    }

    if (action === "create") {
      const { error } = await addProductMutation({ payload: formData });

      if (isFetchBaseQueryError(error)) {
        try {
          const [name, message] = error.data.message.split(":");
          form.setError(name as keyof FormFields, {
            message: message,
          });
        } catch {
          form.setError("root", { message: "Internal server error" });
        }
      }
    } else {
      const { error } = await updateProductMutation({
        id: params.id,
        payload: formData,
      });
      if (isFetchBaseQueryError(error)) {
        try {
          const [name, message] = error.data.message.split(":");
          form.setError(name as keyof FormFields, {
            message: message,
          });
        } catch {
          form.setError("root", { message: "Internal server error" });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-end items-center gap-4 sticky top-20">
          <Button variant={"outline"} asChild>
            <Link href={"/admin/products"}>Cancel</Link>
          </Button>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
        <div>
          <ul className="flex flex-col items-start gap-2">
            {Object.keys(form.formState.errors).map((key, index) => {
              const error = form.formState.errors[key as keyof FormFields]; // Get the error object using the key
              return (
                <li
                  key={index}
                  className="text-destructive point list-inside list-disc"
                >
                  {error?.message} {/* Access the message property */}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-4 space-y-8">
            {addProductFormControls[0].children.map((formGroup) => (
              <InputGroupCard
                key={formGroup.groupLabel}
                label={formGroup.groupLabel}
              >
                {formGroup.items.map((elem, index) => (
                  <FormElemRenderer key={index} elem={elem} />
                ))}
              </InputGroupCard>
            ))}
          </div>
          <div className="col-span-2 space-y-8">
            {addProductFormControls[1].children.map((formGroup) => (
              <InputGroupCard
                key={formGroup.groupLabel}
                label={formGroup.groupLabel}
              >
                {formGroup.items.map((elem, index) => {
                  return (
                    <FormElemRenderer
                      key={index}
                      elem={{
                        ...elem,
                        options: options[elem.name as keyof typeof options],
                      }}
                    />
                  );
                })}
              </InputGroupCard>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
};

const InputGroupCard = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <div className="p-6 shadow-md border-2 rounded-lg bg-slate-50 flex flex-col items-start gap-4">
      <p>{label}</p>
      {children}
    </div>
  );
};

export default ProductForm;
