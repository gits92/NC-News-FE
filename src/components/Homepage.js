import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";
import { NavLink } from "react-router-dom";
import VoteUpDown from "./Votes";
import fetchArticles from "../actions/articles.action";
import fetchTopicArticles from "../actions/topicArticles.action";
import Loader from "./Loading";
import "./Homepage.css";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchArticles();
  }

  render() {
    if (!this.doneLoading()) return <Loader />;
    const { articles, loading, error } = this.props;
    return (
      <div className="container">
        {articles
          .sort(function(a, b) {
            return b.votes - a.votes;
          })
          .map(article => (
            <li key={article._id} className="box">
              <VoteUpDown votes={article.votes} />
              <NavLink to={`/articles/${article._id}`} key={article._id}>
                <strong className="center" id="hometext">
                  {article.title}{" "}
                </strong>
                {/* <p>{article.votes}</p> */}
              </NavLink>
            </li>
          ))}
      </div>
    );
  }
  doneLoading() {
    return this.props.articles.length;
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
