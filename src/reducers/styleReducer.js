import { 
  ADD_CSS_STYLE,
  REMOVE_CSS_STYLE
} from '../actions/types'

export default function(state = [], action) {
    switch (action.type) {
      case ADD_CSS_STYLE:
        return [
          action.payload.data,
          ...state
        ]
      case REMOVE_CSS_STYLE:
        return [
          action.payload.data,
          ...state
        ]
      default:
        return state
    }
}

/**
 * [
 *   parent_id: parent_count, (from state),
 *   child_id: null || child_count,
 *   breakpoints: [ ...breakpoints ],
 *   rootStyle: { ...styles },
 *   breakPoints: { widthBreakPoints: [], heightBreakPoints: [] },
 *   breakPointStyles: { widthBreakPointStyles: [ {} ], heightBreakPointStyles: [ {} ] }
 *  
 * ]
 * 
 * create the breakpoint property names on the fly
 * as `width_${breakpointNum}` or `height_${breakpointNum}`
 * then later access them by 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */