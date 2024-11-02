import axios from "axios";
import { ErrorResponseWeather, WeatherData } from "../types/weatherTypes";
import { ResponseError } from "../types/axiosResponseTypes";
import { checkError } from "../utils/checkError";
import { CustomError } from "../types/customError";

const API_KEY = "83e04db28427ce445ed9b2f0e9a51e99";

export const weatherApi = async (
  searchCity: string
): Promise<WeatherData | ResponseError> => {
  try {
    const res = await axios.get<WeatherData | ErrorResponseWeather>(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&lang=ru`
    );

    if ("message" in res.data) {
      throw new CustomError(res.data.message, res.data.cod);
    }

    return res.data;
  } catch (error) {
    const err = checkError(error);
    return { message: err.message, code: err.code };
  }
};
