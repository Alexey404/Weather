import { connect } from "react-redux";
import Form from "./form";
import { btnCAC, btnFAC, deleteAC } from "./Redax/weather-reducer";

let mapStateToProps = (state) => {
  return {
    State: state.searchPage.State,
    status: state.searchPage.status,
    statusTemp: state.searchPage.statusTemp,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    deletA: () => {
      dispatch(deleteAC());
    },
    btnC: () => {
      dispatch(btnCAC());
    },
    btnF: () => {
      dispatch(btnFAC());
    },
  };
};

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(Form);

export default FormContainer;
