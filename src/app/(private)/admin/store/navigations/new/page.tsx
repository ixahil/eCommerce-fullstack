"use client";
import CommonForm from "@/components/admin/forms/common-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import { Form } from "@/components/ui/form";
import { menuFormControls } from "@/config/form/forms-data";
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

const AddMenu = () => {
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
    <AddPageLayout title="Add menu" pathname="/products/menu/new">
      <Form {...form}>
        <CommonForm onSubmit={onSubmit} formControls={menuFormControls} />
      </Form>
    </AddPageLayout>
  );
};

export default AddMenu;
