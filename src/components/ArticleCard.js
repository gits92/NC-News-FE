import React from "react";
import { connect } from "react-redux";
import fetchArticleById from "../actions/articleById.action";
import fetchComments from "../actions/comments.action";
import CommentForm from "./CommentForm";
import axios from "axios";
const API_URL = "https://s-sharda-nc.herokuapp.com/api";

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewCommentSubmit = this.handleNewCommentSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchArticleById(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }

  handleNewCommentSubmit(comment) {
    axios
      .post(
        `${API_URL}/articles/${this.props.match.params.id}/comments`,
        comment
      )
      .then(res => {
        console.log("New comment added: ", res);
      })
      .then(res => {
        this.props.fetchComments(this.props.match.params.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.props.articleById.map(article => {
          {
            if (article._id === this.props.match.params.id) {
              return (
                <div className="box">
                  <strong>{article.title} </strong>

                  <p>{article.body}</p>
                  <p>
                    <small>{article.created_by}</small>
                  </p>
                  <p>{article.votes}</p>
                  <br />
                  <section>
                    <CommentForm
                      id={this.props.match.params.id}
                      handleSubmit={this.handleNewCommentSubmit}
                    />
                  </section>
                </div>
              );
            }
          }
        })}
        <br />
        <div className="box">
          {this.props.comment
            .sort(function(a, b) {
              return b.votes - a.votes;
            })
            .map(comment => {
              return (
                <div className="box">
                  <p>{comment.body}</p>
                  <p>
                    <small>{comment.created_by}</small>
                  </p>

                  <p>
                    <small>{comment.votes}</small>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  comment: state.comments.data,
  articleById: state.articleById.data,
  loading: state.articleById.loading,
  error: state.articleById.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticleById: id => {
    dispatch(fetchArticleById(id));
  },
  fetchComments: id => {
    dispatch(fetchComments(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);
