import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";
import { NavLink } from "react-router-dom";

import fetchArticles from "../actions/articles.action";
import fetchTopicArticles from "../actions/topicArticles.action";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchArticles();
  }

  render() {
    const { articles, loading, error } = this.props;
    return (
      <div className="container">
        {articles
          .sort(function(a, b) {
            return b.votes - a.votes;
          })
          .map(article => (
            <li key={article._id} className="box">
              <NavLink to={`/articles/${article._id}`} key={article._id}>
                <strong>{article.title} </strong> <p>{article.votes}</p>
              </NavLink>
            </li>
          ))}
      </div>
    );
  }
}

Homepage.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticles: PT.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles.data,
  loading: state.articles.loading,
  error: state.articles.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => {
    dispatch(fetchArticles());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
