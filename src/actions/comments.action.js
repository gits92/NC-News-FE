import axios from "axios";
import * as types from "./types";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

export const fetchCommentsRequest = () => ({
  type: types.FETCH_COMMENTS_REQUEST
});

export const fetchCommentsSuccess = data => ({
  type: types.FETCH_COMMENTS_SUCCESS,
  payload: data
});

export const fetchCommentsFailure = error => ({
  type: types.FETCH_COMMENTS_FAILURE,
  payload: error
});

export default id => {
  return dispatch => {
    dispatch(fetchCommentsRequest());
    return axios
      .get(`${API_URL}/articles/${id}/comments`)
      .then(res => {
        console.log(res.data.comment, "YOYOYOYOYOYO");
        dispatch(fetchCommentsSuccess(res.data.comment));
      })
      .catch(error => {
        dispatch(fetchCommentsFailure(error.message));
      });
  };
};
