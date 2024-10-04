import { toast } from "react-hot-toast";

export const baseURL = "http://localhost:8000/api/v1/";

export const responseHandler = (response) => {
  return response;
};

export const errorHandler = (error) => {
  switch (error.status) {
    case 401:
      toast.error(error?.data?.message);
      break;
    case 404:
      alert("Page Not Found");
      break;
    default:
      toast.error(error?.data?.message);
      break;
  }
  return error.data;
};
