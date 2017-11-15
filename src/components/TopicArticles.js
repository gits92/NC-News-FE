import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import fetchTopicArticles from "../actions/topicArticles.action";

class TopicArticles extends React.Component {
  componentDidMount() {
    const topicName = this.props.match.params.topic.toLowerCase();
    this.props.fetchTopicArticles(topicName);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.topic !== nextProps.match.params.topic) {
      this.props.fetchTopicArticles(nextProps.match.params.topic.toLowerCase());
    }
  }

  render() {
    const { topicArticles, loading, error } = this.props;
    return (
      <div>
        HELLO
        {topicArticles.map(topicArticle => {
          return (
            <li key={topicArticle._id} className="box">
              <div className="box">
                <NavLink
                  to={`/articles/${topicArticle._id}`}
                  key={topicArticle._id}
                >
                  <strong>{topicArticle.title} </strong>

                  <p>
                    <small>{topicArticle.created_by}</small>
                  </p>
                  <p>{topicArticle.votes}</p>
                </NavLink>
              </div>
            </li>
          );
        })}
      </div>
    );
  }
}

TopicArticles.propTypes = {
  topicArticles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchTopicArticles: PT.func.isRequired
};

const mapStateToProps = state => ({
  topicArticles: state.topicArticles.data,
  loading: state.topicArticles.loading,
  error: state.topicArticles.error
});

const mapDispatchToProps = dispatch => ({
  fetchTopicArticles: topicName => {
    dispatch(fetchTopicArticles(topicName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicArticles);
