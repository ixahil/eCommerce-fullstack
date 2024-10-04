"use client";
// import Image from "next/image";
// import React, { useState, useRef } from "react";
// import { FormFields } from "../admin/forms/product-form";
// import { UseFormRegister } from "react-hook-form";

// type FileDropzoneProps = {
//   register: UseFormRegister<FormFields>;
//   name: string;
//   required: boolean;
//   error: string | null | undefined;
//   label: string;
// };

// const FileDropzone: React.FC<FileDropzoneProps> = ({
//   register,
//   name,
//   label,
//   error,
// }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const droppedFiles = Array.from(event.dataTransfer.files);
//     setFiles(droppedFiles);
//     if (inputRef.current) {
//       const fileList = new DataTransfer();
//       droppedFiles.forEach((file) => fileList.items.add(file));
//       inputRef.current.files = fileList.files; // Update the input file list
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault(); // Prevent default to allow drop
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(event.target.files || []);
//     setFiles(selectedFiles);
//   };

//   return (
//     <div className="grid w-full items-center gap-1.5">
//       <label htmlFor={name} className="block font-medium">
//         {label}
//       </label>
//       <div
//         className="border-dashed border-2 p-4 rounded-xl text-center cursor-pointer min-h-48"
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onClick={() => inputRef.current?.click()} // Open file dialog on click
//       >
//         <input
//           type="file"
//           id={name}
//           {...register(name as keyof FormFields)}
//           onChange={handleFileChange}
//           style={{ display: "none" }} // Hide the default file input
//           multiple // Allow multiple file uploads
//         />
//         <div className="flex gap-8 w-full items-center justify-center h-48">
//           <Image
//             src={"/placeholder.webp"}
//             alt="placeholder"
//             width={100}
//             height={100}
//             className="rounded-lg"
//           />
//           <p className="font-medium text-xl">
//             Drag images here or click to select files
//           </p>
//         </div>
//         {files.length > 0 && (
//           <div className="mt-2">
//             {files.map((file) => (
//               <div key={file.name}>{file.name}</div>
//             ))}
//           </div>
//         )}
//       </div>
//       {error && <span className="text-destructive">{error}</span>}
//     </div>
//   );
// };

// export default FileDropzone;

type FileDropzoneProps = {
  register: UseFormRegister<FormFields>;
  name: string;
  required: boolean;
  error: string | null | undefined;
  label: string;
  setValue: SetFieldValue<FormFields>;
  value: string | null;
};

import { UploadCloud, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { FormFields } from "../admin/forms/product-form";
import { SetFieldValue, UseFormRegister } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

const FileDropzone = ({ setValue, label, name, value }: FileDropzoneProps) => {
  const [image, setImage] = useState(value);
  const fileRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const file = URL.createObjectURL(selectedFile);
    setValue("image", file);
    setImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add("border-4", "border-indigo-500");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove("border-4", "border-indigo-500");
    handleFileChange(event);
  };

  const handleRemoveFile = () => {
    setValue("image", "");
    setImage("");
    fileRef.current.value = "";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className={"text-lg font-semibold mb-2 block"} htmlFor={name}>
        {label}
      </Label>
      <div
        className="border-4 border-dashed rounded-lg p-4 my-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id={"image-upload"}
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {!image ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloud size={40} className="text-muted-foreground mb-2" />
            <span>Drag & Drop or Cick to upload image</span>
          </Label>
        ) : (
          <div className="flex flex-col items-center justify-center relative gap-2">
            <Image
              src={image}
              className="max-w-[250px]"
              width={250}
              height={250}
              alt="product-image"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground absolute -top-2 -right-2"
              onClick={handleRemoveFile}
            >
              <XIcon className="" size={20} />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
