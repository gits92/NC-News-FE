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
        <br />
        {topicArticles
          .sort(function(a, b) {
            return b.votes - a.votes;
          })
          .map(topicArticle => {
            return (
              <div className="columns" key={topicArticle._id}>
                <div
                  className="box"
                  style={{ marginTop: "1%", marginBottom: "5%" }}
                >
                  <VoteUpDown id="votetopics" votes={topicArticle.votes} />
                </div>
                <div className="column is-three-quarters">
                  <div
                    className="box"
                    style={{ height: "60%", marginTop: "0%" }}
                  >
                    <NavLink
                      to={`/articles/${topicArticle._id}`}
                      key={topicArticle._id}
                    >
                      <strong id="topicarticle">
                        <span>{topicArticle.title}</span>
                      </strong>

                      <p>
                        <small id="topiccreate">
                          <span>{topicArticle.created_by}</span>
                        </small>
                      </p>

                      {/* <p>{topicArticle.votes}</p> */}
                    </NavLink>
                  </div>
                </div>
              </div>
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
