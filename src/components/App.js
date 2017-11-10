import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Topic from "./Topic";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar />
            <Topic />
            <h1 className="App-title">Welcome to Northcoders News</h1>
          </header>

          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/articles/:id" component={ArticleCard} />
            <Route exact path="/topics" component={Topic} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
