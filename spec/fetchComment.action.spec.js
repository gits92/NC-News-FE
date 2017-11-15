import { expect } from "chai";
import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import fetchComments, {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure
} from "../src/actions/comments.action";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

const mockStore = configureMockStore([thunk]);
const id = "5a09c4968b1bd24f0c3badee";

describe("async action creators", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe("fetchComment", () => {
    it("dispatches FETCH_COMMENTS_SUCCESS when fetching articles reponds with 200 and data", () => {
      nock(API_URL)
        .get(`/articles/${id}/comments`)
        .reply(200, { comment: "HELLO" });

      const expectedActions = [
        fetchCommentsRequest(),
        // fetchCommentsFailure("Network Error")
        fetchCommentsSuccess("HELLO")
      ];

      const store = mockStore();

      return store.dispatch(fetchComments(id)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
    it("dispatches FETCH_COMMENTS_FAILURE when fetching articles reponds with an error", () => {
      nock(API_URL)
        .get("/articles/5a09c4968b1bd24f0c3badee/comments")
        .replyWithError({ message: "error" });

      const expectedActions = [
        fetchCommentsRequest(),
        fetchCommentsFailure("error")
      ];

      const store = mockStore();

      return store.dispatch(fetchComments(id)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});
