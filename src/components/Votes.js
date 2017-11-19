import React from "react";
import "./Votes.css";

class VoteUpDown extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.setState({
      score: this.props.votes
    });
  }

  render() {
    return (
      <div id="votebox">
        <div>{this.state.score}</div>
        <button className="countUp" onClick={this.increment}>
          UP
        </button>
        <button className="countDown" onClick={this.decrement}>
          DOWN
        </button>
      </div>
    );
  }

  increment() {
    this.setState({
      score: this.state.score + 1
    });
  }

  decrement() {
    this.setState({
      score: this.state.score - 1
    });
  }
}

export default VoteUpDown;
