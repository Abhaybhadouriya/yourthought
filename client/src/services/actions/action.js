import { SEARCH_QUERY } from '../constant'
export const searchQuery = (data) =>{
    return {
        type:SEARCH_QUERY,
        data:data
    }
}