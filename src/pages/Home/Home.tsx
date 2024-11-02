import React, { useEffect, useMemo, useState } from "react";
import { weatherApi } from "../../api/weather";
import Modal from "../../components/Modal/Modal";
import { CustomError } from "../../types/customError";
import { IconType, WeatherData } from "../../types/weatherTypes";
import { checkError } from "../../utils/checkError";
import { Input } from "../../components/Input/Input";
import s from "./Home.module.scss";
import { toast } from "react-toastify";

const ICONS: Record<IconType, string> = {
  ["01d"]: "/img/sun@2x.png",
  ["02d"]: "/img/cloud@2x.png",
  ["03d"]: "/img/partly_cloudy@2x.png",
  ["04d"]: "/img/cloud@2x.png",
  ["09d"]: "/img/rain@2x.png",
  ["10d"]: "/img/rain@2x.png",
  ["13d"]: "/img/rain@2x.png",
  ["01n"]: "/img/sun@2x.png",
  ["02n"]: "/img/cloud@2x.png",
  ["03n"]: "/img/partly_cloudy@2x.png",
  ["04n"]: "/img/cloud@2x.png",
  ["09n"]: "/img/rain@2x.png",
  ["10n"]: "/img/rain@2x.png",
  ["13n"]: "/img/rain@2x.png"
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
      setIsModal(false);
    } catch (error) {
      const err = checkError(error);
      toast.error(err.message);
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
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handelSearch();
    }
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
          {weather?.weather[0].icon && (
            <img
              className={s.imgWeather}
              src={ICONS[weather.weather[0].icon]}
              alt=""
            />
          )}

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
              onKeyDown={keyPress}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
