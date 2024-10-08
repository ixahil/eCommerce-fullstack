"use client";

import { Button } from "@/components/ui/button";
import { CommonFormGroup } from "@/config/form/forms-data";
import { FormElemRenderer } from "@/utils/formElementRenderer";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { FieldError, FieldValues, useFormContext } from "react-hook-form";

interface CommonFormProps {
  formControls: CommonFormGroup[];
  onSubmit: (values: FieldValues) => Promise<void>;
}

const CommonForm: React.FC<CommonFormProps> = ({ formControls, onSubmit }) => {
  const { handleSubmit, formState } = useFormContext();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end items-center gap-4 sticky top-20">
        <Button variant={"outline"}>
          <Link href={"/admin/collections"}>Cancel</Link>
        </Button>
        <Button disabled={formState.isSubmitting || !formState.isDirty}>
          {formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </div>
      <div>
        <ul className="flex flex-col items-start gap-2">
          {Object.keys(formState.errors).map((key, index) => {
            const error = formState.errors[
              key as keyof typeof formState.errors
            ] as FieldError;

            return (
              <li
                key={index}
                className="text-destructive list-inside list-disc"
              >
                {error?.message ?? null}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4 space-y-8">
          {formControls[0].children.map((formGroup) => (
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
          {formControls[1].children.map((formGroup) => (
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
      </div>
    </form>
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
    <div className="p-6 shadow-md border-2 rounded-lg bg-slate-50 dark:bg-[#09090B] flex flex-col items-start gap-4">
      <p>{label}</p>
      {children}
    </div>
  );
};

export default CommonForm;
