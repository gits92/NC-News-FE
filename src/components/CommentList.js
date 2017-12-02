import React from "react";
import VoteUpDown from "./Votes";
import "./CommentList.css";

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
      <div className="container">
        <div className="columns">
          <div className="box" style={{ marginTop: "1%", marginBottom: "10%" }}>
            <VoteUpDown id="votecomments" votes={comment.votes} />
          </div>
          <div className="column is-two-thirds">
            <div
              className="box"
              style={{ height: "80%", marginTop: "0%", marginBottom: "2%" }}
            >
              {comment.body}

              <p>
                <small>{comment.created_by}</small>
              </p>
            </div>
          </div>

          <div className="box" style={{ marginTop: "1%", marginBottom: "10%" }}>
            <input
              id="deletebutton"
              type="submit"
              className="button is-danger is-outlined"
              value="Delete"
              name={comment._id}
              onClick={this.handleDeleteSubmit}
            />
          </div>

          <p />
        </div>
      </div>
    );
  }
}

export default CommentList;
