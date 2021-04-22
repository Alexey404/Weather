import { combineReducers, createStore } from "redux";
import weatherReducer from "./weather-reducer";

let reducers = combineReducers({
  searchPage: weatherReducer,
});

let store = createStore(reducers);

export default store;
