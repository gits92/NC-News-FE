import { combineReducers } from "redux";

import articles from "./articles.reducer";
import articleById from "./articleCard.reducer";
import topics from "./topics.reducer";
import topicArticles from "./topicArticles.reducer";
import postComment from "./postComment.reducer";
import comments from "./comments.reducer";

const reducer = combineReducers({
  topics,
  articles,
  articleById,
  topicArticles,
  postComment,
  comments
});

export default reducer;
