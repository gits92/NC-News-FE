import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import fetchTopicArticles from "../actions/topicArticles.action";
import VoteUpDown from "./Votes";
import "./TopicArticles.css";

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
        {topicArticles
          .sort(function(a, b) {
            return b.votes - a.votes;
          })
          .map(topicArticle => {
            return (
              <li key={topicArticle._id} className="box">
                <div className="box">
                  <VoteUpDown id="votetopics" votes={topicArticle.votes} />
                  <NavLink
                    to={`/articles/${topicArticle._id}`}
                    key={topicArticle._id}
                  >
                    <strong id="topicarticle">{topicArticle.title} </strong>

                    <p>
                      <small id="topiccreate">{topicArticle.created_by}</small>
                    </p>

                    {/* <p>{topicArticle.votes}</p> */}
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
