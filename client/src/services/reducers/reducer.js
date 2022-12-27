import { SEARCH_QUERY } from "../constant";
const initialSearchQuery = [];
export default function searchQuery(state=initialSearchQuery, action) {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, initialSearchQuery: action.data };
    default:
     return state ;
  }
}
