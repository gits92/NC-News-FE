import { combineReducers } from "redux";

import articles from "./articles.reducer";
import articleById from "./articleCard.reducer";
import topics from "./topics.reducer";

const reducer = combineReducers({
  topics,
  articles,
  articleById
});

export default reducer;
