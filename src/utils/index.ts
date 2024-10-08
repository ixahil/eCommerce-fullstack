import { CustomizedFetchBaseQueryError } from "@/store/api/product-api";
import { isFetchBaseQueryError } from "@/store/utils";
import { AppResponse } from "@/types/product";
import { SerializedError } from "@reduxjs/toolkit";
import { FieldValues, UseFormSetError } from "react-hook-form";

export const convertToBase64 = (file: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

type MutationResponse = {
  data?: AppResponse<null>;
  error?: CustomizedFetchBaseQueryError | SerializedError;
};

export const submitHandler = async <T extends FieldValues>(
  candidateData: FieldValues,
  mutationFn: (args: {
    payload: FormData | FieldValues;
    id?: string | null;
  }) => Promise<MutationResponse>,
  setError: UseFormSetError<T>,
  id: string | null = null,
  isFormData: boolean = true
): Promise<{ success: boolean; error?: string }> => {
  let formData;
  if (isFormData) {
    formData = new FormData();

    // Construct FormData from candidateData
    for (const key in candidateData) {
      if (candidateData.hasOwnProperty(key)) {
        const value = candidateData[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item);
            } else {
              formData.append(key, item);
            }
          });
        } else if (value != null) {
          if (typeof value === "string" || typeof value === "number") {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value);
          }
        }
      }
    }
  } else {
    formData = candidateData;
  }

  try {
    const response = await mutationFn({ payload: formData, id: id });

    if (response.error) {
      if (isFetchBaseQueryError(response.error)) {
        const [name, message] = response.error.data.message.split(":");
        setError(name, {
          // Use correct key casting
          type: "server",
          message: message,
        });
        return { success: false, error: response.error.data.message };
      }
      return { success: false, error: "An unknown error occurred." };
    }

    return { success: true }; // Successful submission
  } catch {
    setError("root", { message: "Internal server error" });
    return { success: false, error: "Internal server error" };
  }
};
