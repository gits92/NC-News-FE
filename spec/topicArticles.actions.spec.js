import { expect } from "chai";
import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import fetchTopicArticles, {
  fetchTopicArticlesRequest,
  fetchTopicArticlesSuccess,
  fetchTopicArticlesFailure
} from "../src/actions/topicArticles.action";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";
const topic = "football";
const mockStore = configureMockStore([thunk]);

describe("async action creators", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe("fetchTopicArticles", () => {
    it("dispatches FETCH_TOPIC_ARTICLES_SUCCESS when fetching ArticleById reponds with 200 and data", () => {
      nock(API_URL)
        .get(`/topics/${topic}/articles`)
        .reply(200, { articles: [1, 2, 3] });

      const expectedActions = [
        fetchTopicArticlesRequest(),
        fetchTopicArticlesSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(fetchTopicArticles(topic)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
    it("dispatches FETCH_TOPIC_ARTICLES_FAILURE when fetching ArticleById reponds with an error", () => {
      nock(API_URL)
        .get(`/topics/${topic}/articles`)
        .replyWithError({ message: "error" });

      const expectedActions = [
        fetchTopicArticlesRequest(),
        fetchTopicArticlesFailure("error")
      ];

      const store = mockStore();

      return store.dispatch(fetchTopicArticles(topic)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});
