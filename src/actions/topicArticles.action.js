import axios from "axios";
import * as types from "./types";

const API_URL = "https://s-sharda-nc.herokuapp.com/api";

export const fetchTopicArticlesRequest = () => ({
  type: types.FETCH_TOPIC_ARTICLES_REQUEST
});

export const fetchTopicArticlesSuccess = data => ({
  type: types.FETCH_TOPIC_ARTICLES_SUCCESS,
  payload: data
});

export const fetchTopicArticlesFailure = error => ({
  type: types.FETCH_TOPIC_ARTICLES_FAILURE,
  payload: error
});

export default topicName => {
  return dispatch => {
    dispatch(fetchTopicArticlesRequest());
    return axios
      .get(`${API_URL}/topics/${topicName}/articles`)
      .then(res => {
        console.log(res, "HELLOOOOO");
        dispatch(fetchTopicArticlesSuccess(res.data.articles));
      })
      .catch(error => {
        dispatch(fetchTopicArticlesFailure(error.message));
      });
  };
};
