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
        {/* <a className="button is-succes">Vote Up</a>
        <a className="button is-danger">Vote Down</a> */}
        <button
          id="upbutton"
          className="button is-info"
          onClick={this.increment}
        >
          Vote Up
        </button>
        <small id="votescore"> {this.state.score} </small>
        <button
          id="downbutton"
          className="button is-danger"
          onClick={this.decrement}
        >
          Vote Down
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
