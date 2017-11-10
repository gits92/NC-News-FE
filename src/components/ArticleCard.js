import React from "react";
import { connect } from "react-redux";
import fetchArticleById from "../actions/articleCard.action";

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchArticleById(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        {this.props.articles.map(article => {
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  articles: state.articles.data,
  loading: state.articles.loading,
  error: state.articles.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticleById: id => {
    dispatch(fetchArticleById(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);
