import React from "react";
import { connect } from "react-redux";
import axios from "axios";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: { comment: "" }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let comment = event.target.value;
    this.setState({
      newComment: { comment }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.newComment);
    this.setState({
      newComment: { comment: "" }
    });
  }

  render() {
    return (
      <div className="field">
        <form onSubmit={this.handleSubmit}>
          <div className="control">
            <input
              className="textarea is-warning"
              type="text"
              placeholder="Share your thoughts"
              onChange={this.handleChange}
              value={this.state.newComment.comment}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CommentForm;
