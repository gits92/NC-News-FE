import { expect } from "chai";
import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import postComment, {
  postCommentRequest,
  postCommentSuccess,
  postCommentFailure
} from "../src/actions/postComment.action";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

const mockStore = configureMockStore([thunk]);
const id = "5a09c4968b1bd24f0c3badee";
const comment = "hello";

describe("async action creators", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe("postComment", () => {
    it("dispatches POST_COMMENT_SUCCESS when posting comments reponds with 200 and data", () => {
      nock(API_URL)
        .post(`/articles/5a09c4968b1bd24f0c3badee/comments`)
        .reply(200, { comment: "hello" });

      const expectedActions = [
        postCommentRequest(),
        // postCommentFailure("Network Error")
        postCommentSuccess("hello")
      ];

      const store = mockStore();

      return store.dispatch(postComment(id, comment)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
    it("dispatches POST_COMMENT_FAILURE when posting comments reponds with an error", () => {
      nock(API_URL)
        .post(`/articles/5a09c4968b1bd24f0c3badee/comments`)
        .replyWithError({ message: "error" });

      const expectedActions = [
        postCommentRequest(),
        postCommentFailure("error")
      ];

      const store = mockStore();

      return store.dispatch(postComment(id, comment)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});
