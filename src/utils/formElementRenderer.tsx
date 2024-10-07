"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddProductFormItem } from "@/config/form/forms-data";

import { FormFields } from "@/components/admin/forms/product-form";
import MultiImageUploader from "@/components/shared/multi-image-uploader";
import SingleImageUploader from "@/components/shared/single-image-uploader";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

type FormElemRendererProps = {
  elem: AddProductFormItem;
};

export const FormElemRenderer = ({ elem }: FormElemRendererProps) => {
  const {
    componentType,
    name,
    label,
    placeholder,
    disabled,
    required,
    type,
    multiple,
  } = elem;

  const { control, formState } = useFormContext();
  const nameKey = name as keyof FormFields;

  switch (componentType) {
    case "input":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    required={required}
                    disabled={disabled}
                  />
                </FormControl>
                {formState.errors[nameKey] && (
                  <FormMessage>
                    {formState?.errors[nameKey]?.message as string}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      );

    case "number":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    required={required}
                    disabled={disabled}
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number(e.target.value)
                        : undefined; // Convert to number
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                {formState.errors[nameKey] && (
                  <FormMessage>
                    {formState?.errors[nameKey]?.message as string}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      );

    case "textarea":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    {...field} // Use field to manage value
                    required={required}
                    disabled={disabled}
                  />
                </FormControl>
                {formState.errors[nameKey] && (
                  <FormMessage>
                    {formState?.errors[nameKey]?.message as string}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      );

    case "select":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)} // Ensure this is controlled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {elem.options?.map((option) => (
                    <SelectItem key={option.handle} value={option.handle}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage>
                {formState?.errors[nameKey]?.message as string}
              </FormMessage>
            </FormItem>
          )}
        />
      );

    case "media":
      return multiple ? (
        <MultiImageUploader name={name} label={label} required={required} />
      ) : (
        <SingleImageUploader name={name} label={label} required={required} />
      );
  }
};
