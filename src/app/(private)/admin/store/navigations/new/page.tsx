"use client";
import CommonForm from "@/components/admin/forms/common-form";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import { Form } from "@/components/ui/form";
import { menuFormControls } from "@/config/form/forms-data";
import { useAddBrandMutation } from "@/store/api/brand-api";
import { useAddMenuMutation } from "@/store/api/menu-api";
import { submitHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const baseMenuSchema = z.object({
  id: z.string(),
  label: z.string(),
  handle: z.string(),
});

type Menu = z.infer<typeof baseMenuSchema> & {
  children: Menu[];
};

const menuSchema: z.ZodType<Menu> = baseMenuSchema.extend({
  children: z.lazy(() => menuSchema.array()),
});

const formSchema = z.object({
  name: z.string(),
  handle: z.string(),
  menu: z.array(menuSchema),
});
export type FormFields = z.infer<typeof formSchema>;

const AddMenu = () => {
  const router = useRouter();

  const [addMenuMutate] = useAddMenuMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      handle: "",
      menu: [],
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
      addMenuMutate,
      form.setError,
      null,
      false
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
