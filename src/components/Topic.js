import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import fetchTopics from "../actions/topics.action";
import "./Topic.css";

class Topic extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchTopics();
  }

  render() {
    const { topics, loading, error } = this.props;
    return (
      <div>
        {topics.map(topic => {
          return (
            <NavLink id="topictitles" to={`/topics/${topic.title}/articles`}>
              <span>{topic.title} </span>
            </NavLink>
          );
        })}
      </div>
    );
  }
}

Topic.propTypes = {
  topics: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchTopics: PT.func.isRequired
};

const mapStateToProps = state => ({
  topics: state.topics.data,
  loading: state.topics.loading,
  error: state.topics.error
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: () => {
    dispatch(fetchTopics());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
