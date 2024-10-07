import { AppResponse } from "@/types/product";
import { toast } from "react-hot-toast";
import { CustomizedFetchBaseQueryError } from "./api/product-api";

export const baseURL = "http://localhost:8000/api/v1/";

export const responseHandler = (response: AppResponse<null>) => {
  return response;
};

export const responseHandlerToast = (response: AppResponse<null>) => {
  toast.success(response?.message);
  return response;
};

export const errorHandler = (error: CustomizedFetchBaseQueryError) => {
  if (error.error) {
    return error;
  } else {
    switch (error.status) {
      case 400:
        toast.error(error.data.message || "Bad Request");
        break;
      case 401:
        toast.error(error.data.message || "Unauthorized");
        break;
      case 404:
        toast.error(error.data.message || "Route not found");
        break;
      default:
        toast.error(error.data.message || "Internal Server Error");
        break;
    }
  }

  return error;
};

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is CustomizedFetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof error.message === "string"
  );
}
