import { expect } from "chai";
import TopicArticles, {
  initialState
} from "../src/reducers/topicArticles.reducer";
import {
  fetchTopicArticlesRequest,
  fetchTopicArticlesSuccess,
  fetchTopicArticlesFailure
} from "../src/actions/topicArticles.action";

describe("TopicArticles reducer", () => {
  describe("default behaviour", () => {
    it("returns the passed previous state if an unrecognised action is passed", () => {
      const action = { type: "whatever" };
      const newState = TopicArticles(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it("uses the initial state if no previous state is passed", () => {
      const action = { type: "whatever" };
      const newState = TopicArticles(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it("handles FETCH_TOPIC_ARTICLES_REQUEST", () => {
    const action = fetchTopicArticlesRequest();
    const newState = TopicArticles(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it("handles FETCH_TOPIC_ARTICLES_SUCCESS", () => {
    const prevState = TopicArticles(undefined, fetchTopicArticlesRequest());
    const data = [1, 2, 3];
    const action = fetchTopicArticlesSuccess(data);
    const newState = TopicArticles(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it("handles FETCH_TOPIC_ARTICLES_FAILURE", () => {
    const prevState = TopicArticles(undefined, fetchTopicArticlesRequest());
    const error = "Something went wrong";
    const action = fetchTopicArticlesFailure(error);
    const newState = TopicArticles(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});
