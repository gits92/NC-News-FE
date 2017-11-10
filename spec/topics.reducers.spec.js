import { expect } from "chai";
import TopicsReducer, { initialState } from "../src/reducers/topics.reducer";
import {
  fetchTopicsRequest,
  fetchTopicsSuccess,
  fetchTopicsFailure
} from "../src/actions/topics.action";

describe.only("Topics reducer", () => {
  describe("default behaviour", () => {
    it("returns the passed previous state if an unrecognised action is passed", () => {
      const action = { type: "whatever" };
      const newState = TopicsReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it("uses the initial state if no previous state is passed", () => {
      const action = { type: "whatever" };
      const newState = TopicsReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it("handles FETCH_TOPICS_REQUEST", () => {
    const action = fetchTopicsRequest();
    const newState = TopicsReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it("handles FETCH_TOPICS_SUCCESS", () => {
    const prevState = TopicsReducer(undefined, fetchTopicsRequest());
    const data = [1, 2, 3];
    const action = fetchTopicsSuccess(data);
    const newState = TopicsReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it("handles FETCH_TOPICS_FAILURE", () => {
    const prevState = TopicsReducer(undefined, fetchTopicsRequest());
    const error = "Something went wrong";
    const action = fetchTopicsFailure(error);
    const newState = TopicsReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});
