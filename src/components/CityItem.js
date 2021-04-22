import React from "react";
import s from "./Search.module.sass";

let CityItem = (props) => {
  let name = props.name;
  let ClickBtn = (e) => {
    e.preventDefault();
    props.btncity(name);
  };

  return (
    <button onClick={ClickBtn} className={s.BTNsearch}>
      {name}
    </button>
  );
};

export default CityItem;
