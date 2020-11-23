import SearchBar from "./SearchBar";
import Results from "./Results";
import {connect} from "react-redux"


function Search() {
  return (
    <div className="content">
      <SearchBar/>
      <Results/>
    </div>
  )
}

export default connect()(Search);
