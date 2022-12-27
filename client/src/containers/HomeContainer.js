import { connect } from "react-redux";
import { searchQuery } from "../services/actions/action";
import LoggedIn from "../component/LoggedIn";
const mapStateToProps = state =>({
    searchQuery:state.searchQuery.initialSearchQuery
})
const mapDispatchToProps= dispatch =>({
    searchQueryHandler:data=>dispatch(searchQuery(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoggedIn)
// export default LoggedIn;