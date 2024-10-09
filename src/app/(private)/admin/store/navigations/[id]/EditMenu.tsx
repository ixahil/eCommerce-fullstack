"use client";
import CommonForm from "@/components/admin/forms/common-form";
import { Form } from "@/components/ui/form";
import { menuFormControls } from "@/config/form/forms-data";
import { useUpdateBrandMutation } from "@/store/api/brand-api";
import { submitHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
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

const EditMenu = ({ data }: { data: FormFields }) => {
  console.log(data);
  const params = useParams();
  const router = useRouter();

  const [updateBrandMutation] = useUpdateBrandMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      handle: data?.handle || "",
      menu: data?.menu || [],
    },
  });

  // Handle form submission
  const onSubmit = async (values: FieldValues) => {
    const { success, error } = await submitHandler(
      values,
      updateBrandMutation,
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
      <CommonForm onSubmit={onSubmit} formControls={menuFormControls} />
    </Form>
  );
};

export default EditMenu;
