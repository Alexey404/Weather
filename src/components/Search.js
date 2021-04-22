import React from "react";
import * as axios from "axios";
import {Redirect} from "react-router";
import s from "./Search.module.sass";
import CityItem from "./CityItem";

let Search = (props) => {
  let searchCity = props.searchPage.searchCity;

  const API_KEY = "83e04db28427ce445ed9b2f0e9a51e99";

  let WeatherApi = (c) => {
    if (c) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${API_KEY}&lang=ru`
        )
        .then((Response) => {
          props.SetState(Response.data);
        });
    }
  };

  let btnSearch = (e) => {
    e.preventDefault();
    WeatherApi(searchCity);
  };

  let SearchText = (e) => {
    let body = e.target.value;
    props.SearchTex(body);
    return body;
  };

  let a = props.status;

  let btncity = (city) => {
    WeatherApi(city);
  };

  let city = props.city;

  let filteredCity = city.filter((city) => {
    return city.name.toLowerCase().includes(searchCity.toLowerCase());
  });
  let newfilteredCity = filteredCity.map((d) => {
    return <CityItem name={d.name} key={d.id} btncity={btncity} />;
  });
  if (searchCity === "") {
    newfilteredCity = "";
  }

  if (a === "getForm") {
    return <Redirect to={"/form"} />;
  }
  return (
    <div className={s.ContSearch}>
      <div className={s.Hi}>
        <div>Привет!</div>
        <div>Укажите город</div>
      </div>
      <form className={s.form}>
        <div className={s.SearchForm}>
          <input 
            className={s.Search}
            type="text"
            value={searchCity}
            onChange={SearchText}
          />
          <button className={s.BtnSearch} onClick={btnSearch}>
            <img
              className={s.IMGSearch}
              src="/img/searchmagnifierinterfacesymbol1_79893.png"
              alt="YTn"
            ></img>
          </button>
        </div>

        <div>{newfilteredCity}</div>
      </form>
    </div>
  );
};
export default Search;
