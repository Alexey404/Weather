import { connect } from "react-redux";
import { ClickAC, searchAC, SetStateAC } from "./Redax/weather-reducer";
import Search from "./Search";

let mapStateToProps = (state) => {
  return {
    searchPage: state.searchPage,
    weather: state.searchPage.weather,
    status: state.searchPage.status,
    city: state.searchPage.city,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    SearchClick: () => {
      dispatch(ClickAC());
    },
    SearchTex: (body) => {
      dispatch(searchAC(body));
    },
    SetState: (state) => {
      dispatch(SetStateAC(state));
    },
  };
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
