import { AddProductFormControls } from "@/config/form/forms-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const FormElemRenderer = ({ elem }) => {
  const { componentType, name, label, ...props } = elem;
  switch (componentType) {
    case "input":
      return (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor={name}>{label}</Label>
          <Input {...props} />
        </div>
      );
    case "textarea":
      return (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor={name}>{label}</Label>
          <Textarea {...props} />
        </div>
      );
    case "select":
      return (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor={name}>{label}</Label>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={elem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {elem.options.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
  }
};
