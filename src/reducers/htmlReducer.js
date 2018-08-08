import { ADD_HTML_ELEMENT, REMOVE_HTML_ELEMENT } from "../actions/types";

/*
*   { 
*     id: increment_val
*     parent_id: this.state.parent_count
*     type: div,
*     id: null, 
*     styles: (applied via state from redux store's cssStyles), 
*     children: [
*       { child_id: inc_val, parent_id: inc_val, type: div, styles: (applied via state from redux store's cssStyles), children: [] },
*      ]
*    }
*  The problem with this approach is that updating or deleting tertiary or quad children won't be a thing
*  Solution: 
*   - Add a property of level (facilitated by redux store's domTree)
*   - Breakout the children into an array of objects of it's own which will be accessible under
*   - Only need to keep track of one id counter on SubDocument state, and then reference any future
*     selected element's id property to assign parent_id, if any
*
*   { 
*     _id: increment_val
*     level: 1, 2, etc... (applied as a class) Will be added via selected items level + 1 if adding new child element
*     type: div, 
*     id: null, 
*     styles: (applied via state from redux store's cssStyles)/ Slash that include the styles here as an, 
*     children: [
*       { child_id: inc_val, parent_id: inc_val, type: div, styles: (applied via state from redux store's cssStyles), children: [] },
*      ]
*    }
*
*  
**/

/***** LAST LEFT OFF CONTEMPLATING HOW TO ACCOUNT FOR ADDING LEVELS TO KEEP TRACK OF ELEMENT TREE DEPTH */
/* A: Use a tree */

// Change state to be an object.
// upon creation of a new parent HTML element,
// state[action.payload.id] = action.payload
// will be used, so that the parent elements
// may be later accessible by their ids

// export default function(state = [], action) {
//   switch (action.type) {
//     case ADD_HTML_ELEMENT:
//       return [action.payload, ...state];
//     case REMOVE_HTML_ELEMENT:
//       return [action.payload, ...state];
//     default:
//       return state;
//   }
// }

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_HTML_ELEMENT:
      return {
        ...state,
        [action.id]: action.payload
      };
    case REMOVE_HTML_ELEMENT:
      return delete state[action.payload.id];
    default:
      return state;
  }
}
