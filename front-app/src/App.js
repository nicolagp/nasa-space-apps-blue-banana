import React, { Component } from "react";
import TrendContextProvider from "./context/TrendContext";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Search from "./components/Search";

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput, locationInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}/${locationInput}`;
    history.push(url);
  };

  render() {
    return (
      <TrendContextProvider>
        <HashRouter basename="">
          <div className="container">
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                path="/search/:searchInput/:locationInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} location={props.match.params.locationInput} />
                )}
              />
              <Route
                path="/"
                render={() => <br />}
              />
            </Switch>
            {/* <Chart /> */}

          </div>
        </HashRouter>
      </TrendContextProvider>
    );
  }
}

export default App;
