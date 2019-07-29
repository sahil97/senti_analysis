import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import mainWrapper from "./components/main-wrapper/main-wrapper";
import ResultPage from "./components/results-page/results-page";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/results" component={ResultPage} />
        <Route path="/" exact component={mainWrapper} />
      </Switch>
    </div>
  );
}

export default App;
