import { expect } from "chai";
import postComment, { initialState } from "../src/reducers/postComment.reducer";
import {
  postCommentRequest,
  postCommentSuccess,
  postCommentFailure
} from "../src/actions/postComment.action";

describe.only("postComment reducer", () => {
  describe("default behaviour", () => {
    it("returns the passed previous state if an unrecognised action is passed", () => {
      const action = { type: "whatever" };
      const newState = postComment(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it("uses the initial state if no previous state is passed", () => {
      const action = { type: "whatever" };
      const newState = postComment(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it("handles POST_COMMENT_REQUEST", () => {
    const action = postCommentRequest();
    const newState = postComment(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it("handles POST_COMMENT_SUCCESS", () => {
    const prevState = postComment(undefined, postCommentRequest());
    const data = [1, 2, 3];
    const action = postCommentSuccess(data);
    const newState = postComment(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it("handles POST_COMMENT_FAILURE", () => {
    const prevState = postComment(undefined, postCommentRequest());
    const error = "Something went wrong";
    const action = postCommentFailure(error);
    const newState = postComment(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});
