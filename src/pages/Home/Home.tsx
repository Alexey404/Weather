import React, { useEffect, useMemo, useState } from "react";
import { weatherApi } from "../../api/weather";
import Modal from "../../components/Modal/Modal";
import { CustomError } from "../../types/customError";
import { WeatherData } from "../../types/weatherTypes";
import { checkError } from "../../utils/checkError";
import s from "./Home.module.scss";
import { Input } from "../../components/Input/Input";

const ICONS = {
  ["дождь"]: <img className={s.imgWeather} src="/img/rain@2x.png" alt="" />,
  ["снег"]: <img className={s.imgWeather} src="/img/rain@2x.png" alt="" />,
  ["01n"]: <img className={s.imgWeather} src="/img/sun@2x.png" alt="" />,
  ["03n"]: (
    <img className={s.imgWeather} src="/img/partly_cloudy@2x.png" alt="" />
  ),
  ["04d"]: <img className={s.imgWeather} src="/img/cloud@2x.png" alt="" />,
  ["10n"]: <img className={s.imgWeather} src="/img/rain@2x.png" alt="" />,
  ["облачно с прояснениями"]: (
    <img className={s.imgWeather} src="/img/partly_cloudy@2x.png" alt="" />
  ),
  ["шторм"]: <img className={s.imgWeather} src="/img/storm@2x.png" alt="" />,
  ["04n"]: <img className={s.imgWeather} src="/img/cloud@2x.png" alt="" />,
  ["02n"]: <img className={s.imgWeather} src="/img/cloud@2x.png" alt="" />
};

export const Home = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [tempShow, setTempShow] = useState<"tempC" | "tempF">("tempC");
  const [search, setSearch] = useState<string>("Москва");

  const getWeatherApi = async (search: string) => {
    try {
      const response = await weatherApi(search);
      if ("message" in response) {
        throw new CustomError(response.message);
      }

      setWeather(response);
    } catch (error) {
      const err = checkError(error);
      return;
    }
  };

  useEffect(() => {
    getWeatherApi(search);
  }, []);

  const tempC = useMemo(() => {
    return Math.round((weather?.main.temp || 0) - 273.15);
  }, [weather?.main.temp]);

  const tempF = useMemo(() => {
    return Math.round((((weather?.main.temp || 0) - 273.15) * 9) / 5 + 32);
  }, [weather?.main.temp]);

  const btnC = () => {
    setTempShow("tempC");
  };

  const btnF = () => {
    setTempShow("tempF");
  };

  const handelSearch = () => {
    getWeatherApi(search);
    setIsModal(false);
  };

  const tempClassC = tempShow === "tempC" ? s.deg__itemС_activ : s.deg__itemС;
  const tempClassF = tempShow === "tempF" ? s.deg__itemF_activ : s.deg__itemF;

  return (
    <div className={s.all}>
      <header className={s.header}>
        <div className={s.location}>
          <div className={s.btnCont}>
            <div className={s.location__city}>{weather?.name}</div>
            <ul className={s.deg}>
              <li onClick={btnC} className={tempClassC}>
                C
              </li>
              <li onClick={btnF} className={tempClassF}>
                F
              </li>
            </ul>
          </div>
          <div className={s.locationCont}>
            <button
              onClick={() => setIsModal(true)}
              className={s.location__change}
            >
              Сменить город
            </button>
            <img className={s.locationImg} src="/img/location@2x.png" alt="" />
            <div className={s.location__my}>Мое местоположение</div>
          </div>
        </div>
      </header>
      <div className={s.main}>
        <div className={s.tempImg}>
          {ICONS[weather?.weather[0].icon || "01n"]}
          <span className={s.main__num}>
            {tempShow === "tempC" ? tempC : tempF}
          </span>
        </div>
        <div className={s.main__descr}>{weather?.weather[0].description}</div>
      </div>
      <footer className={s.footer}>
        <ul className={s.footer__item}>
          <li className={s.arg}>Ветер</li>
          <li className={s.val}>{weather?.wind.speed} м/c, западный</li>
        </ul>
        <ul className={s.footer__item}>
          <li className={s.arg}>Давление</li>
          <li className={s.val}>{weather?.main.pressure} мм рт. ст.</li>
        </ul>

        <ul className={s.footer__item}>
          <li className={s.arg}>Влажность</li>
          <li className={s.val}>{weather?.main.humidity}</li>
        </ul>
        <ul className={s.footer__item}>
          <li className={s.arg}>Вероятность дождя</li>
          <li className={s.val}>10%</li>
        </ul>
      </footer>
      {isModal && (
        <Modal
          title="Выберите город"
          onClose={() => setIsModal(false)}
          modalSize="small"
          actionTitle="Искать"
          onActionClick={handelSearch}
        >
          <div>Введите город</div>
          <div className={s["input-container"]}>
            <Input
              value={search}
              onChange={(value) => setSearch(value.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
