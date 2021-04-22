import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import FormContainer from "./components/formContainer";
import SearchContainer from "./components/SearchContainer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={() => <SearchContainer />} />
        <Route path="/form" render={() => <FormContainer />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
