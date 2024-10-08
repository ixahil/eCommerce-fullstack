"use client";
import CommonForm from "@/components/admin/forms/common-form";
import { Form } from "@/components/ui/form";
import { CommonFormGroup } from "@/config/form/forms-data";
import { useUpdateBrandMutation } from "@/store/api/brand-api";
import { Brand } from "@/types/product";
import { submitHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  data?: Brand;
  formControls: CommonFormGroup[];
};

const formSchema = z.object({
  name: z.string().min(3, "Name must be greater than 3 char").trim(),
  description: z.string(),
  image: z.union([z.instanceof(File), z.string()]).nullable(),
  status: z.string(),
  handle: z.string().trim(),
});
export type FormFields = z.infer<typeof formSchema>;

const EditBrand = ({ formControls, data }: Props) => {
  const params = useParams();
  const router = useRouter();

  const [updateBrandMutation] = useUpdateBrandMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      image: data?.image?.url || "",
      status: data?.status || "ACTIVE",
      handle: data?.handle || "",
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
      <CommonForm onSubmit={onSubmit} formControls={formControls} />
    </Form>
  );
};

export default EditBrand;
