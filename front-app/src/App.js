import React, { Component } from "react";
import TrendContextProvider from "./context/TrendContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NewForm from "./components/NewForm";
import Search from "./components/Search";

class App extends Component {
  // Prevent page reload, set URL and push history on submit
  handleSubmit = (e, history, searchInput, locationInput) => {

  };

  render() {
    return (
      <div className="container">
        <Route
          render={props => (
            <NewForm
              handleSubmit={this.handleSubmit}
              history={props.history}
            />
          )}
        />
        <Search>

        </Search>
      </div>
    );
  }
}

export default App;
