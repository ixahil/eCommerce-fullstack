"use client";
import { Button } from "@/components/ui/button";
import { addCollectionFormControls } from "@/config/form/forms-data";
import { FormElemRenderer } from "@/utils/formElementRenderer";

import { Form } from "@/components/ui/form";
import {
  useAddCollectionMutation,
  useUpdateCollectionMutation,
} from "@/store/api/collection-api";
import { isFetchBaseQueryError } from "@/store/utils";
import { Collection } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema for individual form items
const formSchema = z.object({
  name: z.string().min(3, "Name must be greater than 3 char"),
  description: z.string(),
  image: z.union([z.instanceof(File), z.string()]),
  status: z.string(),
  handle: z.string(),
});

export type FormFields = z.infer<typeof formSchema>;

// Your form component
const CollectionForm = ({
  data,
  action,
}: {
  data: Collection;
  action: string;
}) => {
  const params = useParams();

  const [addCollectionMutation] = useAddCollectionMutation();
  const [updateCollectionMutation] = useUpdateCollectionMutation();

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

  const name = form.watch("name");

  useEffect(() => {
    if (action === "create") {
      form.setValue("handle", name.toLowerCase().replace(/\s/g, "-"));
    }
  }, [name, action, form]);

  const onSubmit: SubmitHandler<FormFields> = async (candidateData) => {
    const formData = new FormData();

    for (const key in candidateData) {
      if (candidateData.hasOwnProperty(key)) {
        const value = candidateData[key as keyof FormFields];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item);
            }
          });
        } else if (value != null) {
          // Check for null/undefined
          if (typeof value === "string" || typeof value === "number") {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value);
          }
        }
      }
    }

    if (action === "create") {
      const { error } = await addCollectionMutation({ payload: formData });

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
      const { error } = await updateCollectionMutation({
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
            <Link href={"/admin/collections"}>Cancel</Link>
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
            {addCollectionFormControls[0].children.map((formGroup) => (
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
            {addCollectionFormControls[1].children.map((formGroup) => (
              <InputGroupCard
                key={formGroup.groupLabel}
                label={formGroup.groupLabel}
              >
                {formGroup.items.map((elem, index) => {
                  return <FormElemRenderer key={index} elem={elem} />;
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

export default CollectionForm;
