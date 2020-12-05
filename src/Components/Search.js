import SearchBar from "./SearchBar";
import Results from "./Results";
import {connect} from "react-redux"


function Search() {
  return (
    <div className="searchContainer">
      <SearchBar/>
      <Results/>
    </div>
  )
}

export default connect()(Search);
