import React from "react";
import s from "./form.module.sass";

const Form = (props) => {
  let deleteA = () => {
    props.deletA();
  };
  const statusTemp = props.statusTemp;
  const State = props.State;
  const name = State.name;
  let temp = State.main.temp;
  const humidity = State.main.humidity;
  const speed = State.wind.speed;
  const pressure = State.main.pressure;
  const description = State.weather[0].description;
  const a = props.status;
  const tempC = Math.round(temp - 273.15);
  const tempF = Math.round(((temp - 273.15) * 9) / 5 + 32);

  const btnC = () => {
    props.btnC();
  };
  const btnF = () => {
    props.btnF();
  };
  let tempClassC = s.deg__itemС;
  let tempClassF = s.deg__itemF;

  let imgWeather = "";

  let tempShow = "";
  if (description === "дождь" || "небольшой дождь" || "снег") {
    imgWeather = <img className={s.imgWeather} src="/img/rain@2x.png" alt="" />;
  }
  if (description === "ясно") {
    imgWeather = <img className={s.imgWeather} src="/img/sun@2x.png" alt="" />;
  }
  if (description === "облачно") {
    imgWeather = (
      <img className={s.imgWeather} src="/img/partly_cloudy@2x.png" alt="" />
    );
  }
  if (description === "облачно с прояснениями") {
    imgWeather = (
      <img className={s.imgWeather} src="/img/partly_cloudy@2x.png" alt="" />
    );
  }
  if (description === "шторм") {
    imgWeather = (
      <img className={s.imgWeather} src="/img/storm@2x.png" alt="" />
    );
  }
  if (description === "пасмурно") {
    imgWeather = (
      <img className={s.imgWeather} src="/img/cloud@2x.png" alt="" />
    );
  }
  if (description === "переменная облачность") {
    imgWeather = (
      <img className={s.imgWeather} src="/img/cloud@2x.png" alt="" />
    );
  }
  console.log(description);

  if (statusTemp === false) {
    tempShow = tempC;
    tempClassC = s.deg__itemС_activ;
  } else {
    tempShow = tempF;
    tempClassF = s.deg__itemF_activ;
  }

  return (
    <div className={s.all}>
      <header className={s.header}>
        <div className={s.location}>
          <div className={s.btnCont}>
            <div className={s.location__city}>{name}</div>
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
            <button onClick={deleteA} className={s.location__change} href="#">
              Сменить город
            </button>
            <img className={s.locationImg} src="/img/location@2x.png" alt="" />
            <div className={s.location__my}>Мое местоположение</div>
          </div>
        </div>
      </header>
      <div className={s.main}>
        <div className={s.tempImg}>
          {imgWeather}
          <span className={s.main__num}>{tempShow}</span>
        </div>
        <div className={s.main__descr}>{description}</div>
      </div>
      <footer className={s.footer}>
        <ul className={s.footer__item}>
          <li className={s.arg}>Ветер</li>
          <li className={s.val}>{speed} м/c, западный</li>
        </ul>
        <ul className={s.footer__item}>
          <li className={s.arg}>Давление</li>
          <li className={s.val}>{pressure} мм рт. ст.</li>
        </ul>

        <ul className={s.footer__item}>
          <li className={s.arg}>Влажность</li>
          <li className={s.val}>{humidity}</li>
        </ul>
        <ul className={s.footer__item}>
          <li className={s.arg}>Вероятность дождя</li>
          <li className={s.val}>10%</li>
        </ul>
      </footer>
    </div>
  );
};
export default Form;
