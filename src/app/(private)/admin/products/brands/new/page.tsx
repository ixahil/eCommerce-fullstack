"use client";
import CommonForm from "@/components/admin/forms/common-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import { Form } from "@/components/ui/form";
import { brandFormControls } from "@/config/form/forms-data";
import { useAddBrandMutation } from "@/store/api/brand-api";
import { submitHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be greater than 3 char"),
  description: z.string(),
  image: z.union([z.instanceof(File), z.string()]),
  status: z.string(),
  handle: z.string(),
});

export type FormFields = z.infer<typeof formSchema>;

const AddBrand = () => {
  const router = useRouter();
  const [addBrandMutation] = useAddBrandMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      status: "ACTIVE",
      handle: "",
    },
  });

  const name = form.watch("name");

  useEffect(() => {
    form.setValue("handle", name.toLowerCase().replace(/\s/g, "-"));
  }, [name, form]);

  const onSubmit = async (values: FieldValues) => {
    console.log(values);
    const { success, error } = await submitHandler(
      values,
      addBrandMutation,
      form.setError
    );

    if (success) {
      router.back();
    } else {
      console.error("Submission failed:", error);
    }
  };

  return (
    <AddPageLayout title="Add Brand" pathname="/products/brands/new">
      <Form {...form}>
        <CommonForm onSubmit={onSubmit} formControls={brandFormControls} />
      </Form>
    </AddPageLayout>
  );
};

export default AddBrand;
