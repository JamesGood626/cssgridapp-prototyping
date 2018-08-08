import { combineReducers } from "redux";
import htmlReducer from "./htmlReducer";
import styleReducer from "./styleReducer";

export default combineReducers({
  htmlElements: htmlReducer,
  cssStyles: styleReducer
});
