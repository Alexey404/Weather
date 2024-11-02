import axios from "axios";
import { CustomError } from "../types/customError";
import {
  IErrorAxiosResponse,
  ResponseError
} from "../types/axiosResponseTypes";

const UNHANDLED_ERROR = "Необработанная ошибка";

export const checkError = (error: unknown): ResponseError => {
  if (error instanceof CustomError) {
    return { message: error.message, code: error.code };
  }

  if (axios.isAxiosError(error)) {
    const data: IErrorAxiosResponse = error.response?.data;

    if (typeof data.meta.error === "string") {
      return {
        message: data.meta.error,
        code: error.response?.status
      };
    }

    if (data.meta.error && "message" in data.meta.error) {
      return {
        message: data.meta.error.message,
        code: data.meta.error.code
      };
    }

    return { message: UNHANDLED_ERROR };
  }
  return { message: UNHANDLED_ERROR };
};
