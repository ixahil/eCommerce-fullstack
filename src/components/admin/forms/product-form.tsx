"use client";
import { Button } from "@/components/ui/button";
import { addProductFormControls } from "@/config/form/forms-data";
import { FormElemRenderer } from "@/utils/formElementRenderer";

import { useGetBrandsQuery } from "@/store/api/brand-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCollectionsQuery } from "@/store/api/collection-api";
import Link from "next/link";
import { Product } from "@/types/product";
import { ReactNode } from "react";
import { Form } from "@/components/ui/form";

// Define the schema for individual form items
const formSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string(),
  price: z.number(),
  salePrice: z.number(),
  image: z.string(),
  brand: z.string().trim().min(1, "Brand is required"),
  collections: z.string().trim().min(1, "Collection is required"),
  stock: z.number(),
  sku: z.string().min(3),
});

export type FormFields = z.infer<typeof formSchema>;

// Your form component
const ProductForm = ({ data, action }: { data: Product; action: string }) => {
  const { data: brandsData } = useGetBrandsQuery();
  const { data: collectionsData } = useGetCollectionsQuery();

  const brandOptions = brandsData?.data.map((brand) => {
    return { handle: brand.handle, label: brand.name };
  });

  const collectionOptions = collectionsData?.data.map((collection) => {
    return { handle: collection.handle, label: collection.name };
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: data?.brand?.handle,
      collections: data?.collections[0]?.handle,
      name: data?.name || "test product name",
      price: data?.price || 10,
      salePrice: data?.salePrice || 0,
      stock: data?.stock || 10,
      sku: data?.sku || "sku123",
      image: data?.thumbnail?.url || "",
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  console.log("value", getValues("brand"));
  console.log("errors=>", errors);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    switch (action) {
      case "create":
        console.log("Submitted Values:", data);
    }
    // Perform further actions like API calls
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end items-center gap-4">
          <Button variant={"outline"} asChild>
            <Link href={"/admin/products"}>Cancel</Link>
          </Button>
          <Button>Submit</Button>
        </div>
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-4 space-y-8">
            {addProductFormControls[0].children.map((formGroup) => (
              <InputGroupCard
                key={formGroup.groupLabel}
                label={formGroup.groupLabel}
              >
                {formGroup.items.map((elem, index) => (
                  <FormElemRenderer key={index} elem={elem} form={form} />
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
                {formGroup.items.map((elem, index) => (
                  <FormElemRenderer key={index} elem={elem} form={form} />
                ))}
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

// const SelectInput = ({ elem, formProps, error, defaultValue }) => {
//   return (
//     <div className="grid w-full items-center gap-1.5">
//       <Label htmlFor={elem.name}>{elem.label}</Label>
//       <Select defaultValue={defaultValue}>
//         <SelectTrigger className="w-[280px]">
//           <SelectValue placeholder={elem.placeholder} />
//         </SelectTrigger>
//         <SelectContent>
//           {elem.newOptions?.map((opt) => (
//             <SelectItem key={opt.handle} value={opt.handle}>
//               {opt.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

export default ProductForm;
