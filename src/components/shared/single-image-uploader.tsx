"use client";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SingleImageUploader = ({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required: boolean;
}) => {
  const { setValue, getValues } = useFormContext();
  const initialValues = getValues(name);

  // Initialize localFiles as either an array with a single string or an empty array
  const [localImage, setLocalImage] = useState<string>(initialValues || "");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFile = selectedFiles[0];
      setLocalImage(URL.createObjectURL(newFile));
      setValue(name, newFile);
    }
  };

  const handleRemove = () => {
    setLocalImage("");
    setValue(name, null);
  };

  const handleEdit = () => {
    inputRef.current?.click();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      setLocalImage(URL.createObjectURL(newFile));
      setValue(name, newFile);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {localImage ? (
          <div className="relative flex flex-col items-end w-40 h-40 rounded-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-300 shadow-lg">
            <Image
              src={localImage}
              width={150}
              height={150}
              alt={`Product Image`}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-1 right-1 flex space-x-2">
              <button
                aria-label={`Remove image`}
                onClick={handleRemove}
                type="button"
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                <Trash className="w-4 h-4" />
              </button>
              <button
                aria-label={`Edit image`}
                onClick={handleEdit}
                type="button"
                className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <Label htmlFor={name} className="text-lg font-medium">
        {label}
      </Label>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleEditChange}
      />
      <Input
        type="file"
        className="hidden"
        id={name}
        accept="image/*"
        required={required}
        onChange={handleAdd}
      />
      <Label
        htmlFor={name}
        className="flex cursor-pointer border-2 border-dashed border-gray-400 w-full h-24 rounded-xl items-center justify-center hover:border-gray-600 transition duration-200"
      >
        Upload Image
      </Label>
    </div>
  );
};

export default SingleImageUploader;
