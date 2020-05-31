import React, { Component } from "react";
import TrendContextProvider from "./context/TrendContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NewForm from "./components/NewForm";
import Search from "./components/Search";
import axios from "axios";


const client = axios.get('http://127.0.0.1:5000/trends/api/interest?keyword="coronavirus"&country=BR')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(
      "Encountered an error with fetching and parsing data",
      error
    );
  });

class App extends Component {
  // Prevent page reload, set URL and push history on submit
  handleSubmit = (e, history, searchInput, locationInput) => {
    e.preventDefault();
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
                <NewForm
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                path="/search/:searchInput/:locationInput"
                render={props => (
                  <Search
                    searchTerm={props.match.params.searchInput}
                    location={props.match.params.locationInput} />
                )}
              />
              <Route
                path="/"
                render={() => <br />}
              />
            </Switch>
          </div>
        </HashRouter>
      </TrendContextProvider>
    );
  }
}

export default App;
