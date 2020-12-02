import SearchBar from "./SearchBar";
import Results from "./Results";
import {connect} from "react-redux"


function Search() {
  return (
    <span>
      <SearchBar/>
      <Results/>
    </span>
  )
}

export default connect()(Search);
