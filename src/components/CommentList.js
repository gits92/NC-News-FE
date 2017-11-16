import React from "react";
import VoteUpDown from "./Votes";

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
  }

  handleDeleteSubmit(event) {
    this.props.deleteComment(event.target.name);
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className="box">
        <p>{comment.body}</p>
        <p>
          <small>{comment.created_by}</small>
        </p>

        <p>
          <VoteUpDown votes={comment.votes} />
          <small>{comment.votes}</small>
        </p>
        <p>
          <input
            type="submit"
            className="button is-danger is-outlined"
            value="Delete"
            name={comment._id}
            onClick={this.handleDeleteSubmit}
          />
        </p>
      </div>
    );
  }
}

export default CommentList;
