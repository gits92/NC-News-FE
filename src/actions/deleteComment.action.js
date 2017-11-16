import axios from "axios";
import * as types from "./types";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

export const deleteCommentRequest = () => ({
  type: types.DELETE_COMMENT_REQUEST
});

export const deleteCommentSuccess = data => ({
  type: types.DELETE_COMMENT_SUCCESS,
  payload: data
});

export const deleteCommentFailure = error => ({
  type: types.DELETE_COMMENT_FAILURE,
  payload: error
});

export default comment_id => {
  return dispatch => {
    dispatch(deleteCommentRequest());
    return axios
      .delete(`${API_URL}/comments/${comment_id}`)
      .then(res => {
        dispatch(deleteCommentSuccess(comment_id));
      })
      .catch(error => {
        dispatch(deleteCommentFailure(error.message));
      });
  };
};
