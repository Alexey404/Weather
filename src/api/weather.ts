import axios, { AxiosResponse } from "axios";
import { WeatherData } from "../types/weatherTypes";
import { ResponseError } from "../types/axiosResponseTypes";

const API_KEY = "83e04db28427ce445ed9b2f0e9a51e99";

export const weatherApi = async (
  searchCity: string
): Promise<WeatherData | ResponseError> => {
  try {
    const res = await axios.get<WeatherData>(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&lang=ru`
    );

    return res.data;
  } catch (error) {
    return { message: "Произошла ошибка" };
  }
};
