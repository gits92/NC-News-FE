import axios from "axios";
import * as types from "./types";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

export const fetchArticleByIdRequest = () => ({
  type: types.FETCH_ARTICLEBYID_REQUEST
});

export const fetchArticleByIdSuccess = data => ({
  type: types.FETCH_ARTICLEBYID_SUCCESS,
  payload: data
});

export const fetchArticleByIdFailure = error => ({
  type: types.FETCH_ARTICLEBYID_FAILURE,
  payload: error
});

export default id => {
  return dispatch => {
    dispatch(fetchArticleByIdRequest());
    return axios
      .get(`${API_URL}/articles/${id}`)
      .then(res => {
        dispatch(fetchArticleByIdSuccess(res.data.ArticleById));
      })
      .catch(error => {
        dispatch(fetchArticleByIdFailure(error.message));
      });
  };
};
