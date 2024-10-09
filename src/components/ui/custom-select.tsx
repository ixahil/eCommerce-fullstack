import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

type SelectOption = {
  handle: string;
  label: string;
};

type CustomSelectProps = {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder: string;
  value: string;
  error?: string;
  setSelect?: (value: string) => void;
};

const CustomSelect = ({
  label,
  name,
  setSelect,
  options,
  placeholder,
  error,
  value,
}: CustomSelectProps) => {
  return (
    <div className="w-full space-y-4">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Select onValueChange={setSelect} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.handle} value={option.handle}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Display error if any */}
    </div>
  );
};

export default CustomSelect;
