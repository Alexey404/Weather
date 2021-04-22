const SEARCH = "SEARCH";
const BTN_SEARCH = "BTN_SEARCH";
const SETSTATE = "SETSTATE";
const DELETE = "DELETE";
const BTNC = "BTNC";
const BTNF = "BTNF";

let search = {
  searchCity: "",
  State: {
    coord: {
      lon: "",
      lat: "",
    },
    weather: [
      {
        id: "",
        main: "",
        description: "",
        icon: "",
      },
    ],
    base: "",
    main: {
      temp: "",
      feels_like: "",
      temp_min: "",
      temp_max: "",
      pressure: "",
      humidity: "",
    },
    visibility: "",
    wind: {
      speed: "",
      deg: "",
    },
    rain: {
      "1h": "",
    },
    clouds: {
      all: "",
    },
    dt: "",
    sys: {
      type: "",
      id: "",
      country: "",
      sunrise: "",
      sunset: "",
    },
    timezone: "",
    id: "",
    name: "",
    cod: "",
  },
  status: "getSearch",
  city: [
    { id: "1", name: "Москва" },
    { id: "2", name: "Майкоп" },
    { id: "3", name: "Медвежьегорск" },
    { id: "4", name: "Майский" },
    { id: "5", name: "Краснодар" },
    { id: "6", name: "Киров" },
    { id: "7", name: "Калининград" },
  ],
  statusTemp: false,
};
const weatherReducer = (state = search, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchCity: action.body,
      };
    case SETSTATE:
      return {
        ...state,
        State: action.stateApi,
        status: "getForm",
      };
    case DELETE:
      return { ...state, status: "getSearch" };
    case BTNC:
      return { ...state, statusTemp: false };
    case BTNF:
      return { ...state, statusTemp: true };
    default:
      return state;
  }
};

export const ClickAC = () => {
  return {
    type: BTN_SEARCH,
  };
};
export const searchAC = (body) => {
  return {
    type: SEARCH,
    body: body,
  };
};
export const SetStateAC = (stateApi) => {
  return {
    type: SETSTATE,
    stateApi: stateApi,
  };
};
export const deleteAC = () => {
  return {
    type: DELETE,
  };
};
export const btnCAC = () => {
  return {
    type: BTNC,
  };
};
export const btnFAC = () => {
  return {
    type: BTNF,
  };
};

export default weatherReducer;
