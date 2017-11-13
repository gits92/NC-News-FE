import { combineReducers } from "redux";

import articles from "./articles.reducer";
import articleById from "./articleCard.reducer";
import topics from "./topics.reducer";
import topicArticles from "./topicArticles.reducer";

const reducer = combineReducers({
  topics,
  articles,
  articleById,
  topicArticles
});

export default reducer;
