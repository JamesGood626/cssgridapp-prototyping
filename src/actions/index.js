import {
  ADD_HTML_ELEMENT,
  ADD_CSS_STYLE,
  REMOVE_HTML_ELEMENT,
  REMOVE_CSS_STYLE
} from "./types";

export const addHtmlElement = values => async dispatch => {
  dispatch({ type: ADD_HTML_ELEMENT, payload: values, id: values.id });
};

export const addCssStyle = values => async dispatch => {
  dispatch({ type: ADD_CSS_STYLE, payload: values });
};

export const removeHtmlElement = values => async dispatch => {
  dispatch({ type: REMOVE_HTML_ELEMENT, payload: values });
};

export const removeCssStyle = values => async dispatch => {
  dispatch({ type: REMOVE_CSS_STYLE, payload: values });
};
