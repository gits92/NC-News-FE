import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import fetchArticles from "../actions/articles.action";

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
        {articles.map(article => {
          return <div className="box">{article.title}</div>;
        })}
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
