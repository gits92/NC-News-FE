import axios from "axios";
import * as types from "./types";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

export const postCommentRequest = () => ({
  type: types.POST_COMMENT_REQUEST
});

export const postCommentSuccess = data => ({
  type: types.POST_COMMENT_SUCCESS,
  payload: data
});

export const postCommentFailure = error => ({
  type: types.POST_COMMENT_FAILURE,
  payload: error
});

export default (id, comment) => {
  return dispatch => {
    dispatch(postCommentRequest());
    return axios
      .post(`${API_URL}/articles/${id}/comments`, { comment })
      .then(res => {
        dispatch(postCommentSuccess(res.data.comment));
      })
      .catch(error => {
        dispatch(postCommentFailure(error.message));
      });
  };
};
