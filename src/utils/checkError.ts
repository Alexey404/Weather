import axios from "axios";
import { ResponseError } from "../types/axiosResponseTypes";
import { CustomError } from "../types/customError";
import { ErrorResponseWeather } from "../types/weatherTypes";

const UNHANDLED_ERROR = "Необработанная ошибка";

export const checkError = (error: unknown): ResponseError => {
  if (error instanceof CustomError) {
    return { message: error.message, code: error.code };
  }

  if (axios.isAxiosError(error)) {
    const data: ErrorResponseWeather = error.response?.data;

    if ("message" in data) {
      return {
        message: data.message,
        code: data.cod
      };
    }

    return { message: UNHANDLED_ERROR };
  }
  return { message: UNHANDLED_ERROR };
};
