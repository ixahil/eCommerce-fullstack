import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddProductFormItem } from "@/config/form/forms-data";

import { FormFields } from "@/components/admin/forms/product-form";
import { Label } from "@/components/ui/label";
import {
  Select as RadixSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FieldError,
  FormProps,
  FormProviderProps,
  FormState,
  SetFieldValue,
  SetValueConfig,
  UseFormRegister,
} from "react-hook-form";
import React, { forwardRef, SelectHTMLAttributes } from "react";
import { SelectProps } from "@radix-ui/react-select";
import FileDropzone from "@/components/shared/file-dropzone";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  elem: AddProductFormItem;
  error: string | null | undefined;
  register: UseFormRegister<FormFields>;
  setValue: SetFieldValue<FormFields>;
  value: string | number;
};

type FormElemRendererProps = {
  elem: AddProductFormItem;
  form: FormProviderProps<FormFields>;
};

// export const FormElemRenderer = ({
//   elem,
//   error,
//   register,
//   setValue,
//   value,
// }: Props) => {
//   const {
//     componentType,
//     name,
//     label,
//     placeholder,
//     type,
//     required,
//     defaultValue,
//     min,
//     disabled,
//   } = elem;
//   switch (componentType) {
//     case "input":
//       return (
//         <div className="grid w-full items-center gap-1.5">
//           <Label htmlFor={name}>{label}</Label>
//           <Input
//             placeholder={placeholder}
//             type={type}
//             required={required}
//             defaultValue={defaultValue}
//             disabled={disabled}
//             {...register(name as keyof FormFields, { required: required })}
//           />
//           {error && <span className="text-destructive">{error}</span>}
//         </div>
//       );
//     case "textarea":
//       return (
//         <div className="grid w-full items-center gap-1.5">
//           <Label htmlFor={name}>{label}</Label>
//           <Textarea
//             placeholder={placeholder}
//             required={required}
//             defaultValue={defaultValue}
//             disabled={disabled}
//             {...register(name as keyof FormFields, { required: required })}
//           />
//           {error && <span className="text-destructive">{error}</span>}
//         </div>
//       );
//     case "number":
//       return (
//         <div className="grid w-full items-center gap-1.5">
//           <Label htmlFor={name}>{label}</Label>
//           <Input
//             min={min}
//             placeholder={placeholder}
//             type={type}
//             required={required}
//             defaultValue={defaultValue}
//             disabled={disabled}
//             {...register(name as keyof FormFields, {
//               required: required,
//               valueAsNumber: true,
//             })}
//           />
//           {error && <span className="text-destructive">{error}</span>}
//         </div>
//       );
//     case "select":
//       return (
//         <div className="grid w-full items-center gap-1.5">
//           <Label htmlFor={name}>{label}</Label>
//           <Select
//             {...register(name as keyof FormFields, { required: required })}
//             ref={null}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//               {elem.options?.map((opt) => (
//                 <SelectItem key={opt.handle} value={opt.handle}>
//                   {opt.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {error && <span className="text-destructive">{error}</span>}
//         </div>
//       );
//     case "media":
//       return (
//         <FileDropzone
//           value={value}
//           setValue={setValue}
//           name="picture"
//           required={true}
//           error={error}
//           label={label}
//         />
//       );
//   }
// };

// export type Ref = HTMLButtonElement;
// const InputTypeSelect = forwardRef<Ref, Props>((props, ref) => {
//   ...
//       <SelectTrigger className="w-[180px]" ref={ref}>
//         <SelectValue placeholder="Select type" aria-label={value}>
//           { InputTypeItems[value] }
//         </SelectValue>
//       </SelectTrigger>
//   ...
// }

// const ForwardRefSelect = React.forwardRef<HTMLDivElement, SelectProps>(
//   (props, ref) => {
//     return <RadixSelect {} />;
//   }
// );

// const MyButton = React.forwardRef<HTMLDivElement, SelectProps>((props, forwardedRef) => (
// 	<RadixSelect  {...props} ref={forwardedRef}/>
// ));
// // Add a display name for the component
// ForwardRefSelect.displayName = "ForwardRefSelect";

export const FormElemRenderer = ({ elem, form }: FormElemRendererProps) => {
  const {
    componentType,
    name,
    label,
    placeholder,
    disabled,
    required,
    type,
    defaultValue,
  } = elem;
  const nameKey = name as keyof FormFields;
  const nameKey2 = name as keyof FieldError;
  switch (componentType) {
    case "input":
      return (
        <FormField
          control={form.control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    type={type}
                    {...field}
                    required={required}
                    defaultValue={defaultValue}
                    disabled={disabled}
                  />
                </FormControl>
                {form.formState.errors[nameKey] && (
                  <FormMessage>
                    {form.formState.errors[nameKey].message}
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
          control={form.control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    type={type}
                    {...field}
                    required={required}
                    defaultValue={defaultValue}
                    disabled={disabled}
                  />
                </FormControl>
                {form.formState.errors[nameKey] && (
                  <FormMessage>
                    {form.formState.errors[nameKey].message}
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
          control={form.control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    {...field}
                    required={required}
                    defaultValue={defaultValue}
                    disabled={disabled}
                  />
                </FormControl>
                {form.formState.errors[nameKey] && (
                  <FormMessage>
                    {form.formState.errors[nameKey].message}
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
          control={form.control}
          name={nameKey}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={defaultValue}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>

              {form.formState.errors[nameKey] && (
                <FormMessage>
                  {form.formState.errors[nameKey].message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
      );
  }
};
