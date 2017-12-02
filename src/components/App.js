import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Topic from "./Topic";
import TopicArticles from "./TopicArticles";
import "./App.css";
import NoMatch from "./NoMatch";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar />
            <Topic />
            <div className="App-title">
              <p id="titlecolor">
                <span>Welcome to Northcoders News</span>
              </p>
            </div>
          </header>

          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/articles/:id" component={ArticleCard} />
            <Route exact path="/topics" component={Topic} />
            <Route
              exact
              path="/topics/:topic/articles"
              component={TopicArticles}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
