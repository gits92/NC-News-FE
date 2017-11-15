import React from "react";
import { connect } from "react-redux";
import fetchArticleById from "../actions/articleById.action";
import fetchComments from "../actions/comments.action";

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchArticleById(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
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
                </div>
              );
            }
          }
        })}
        <br />
        <section>
          {this.props.comments.map(comment => {
            return (
              <div className="box">
                <p>{comment.body}</p>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  articleById: state.articleById.data,
  loading: state.articleById.loading,
  error: state.articleById.error,
  comments: state.comments.data
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
