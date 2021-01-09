import React from "react";
import {connect} from "react-redux";
import {searchMovies, loader} from "../Store/moviesReducer";

class SearchBar extends React.Component {
  constructor(){
    super()
    this.state = {
      movieName: "",
      query: ''
    }
    this.change = this.change.bind(this)
    this.search = this.search.bind(this)
    this.inputRef = React.createRef();
  }

  change(){
    this.setState({query: this.inputRef.current.value})
  }
  search(){
    this.props.buffering(true);
    this.props.searchForMovies(this.state.query)
    this.setState({movieName: this.state.query, query: ""})
  }

  render(){
    return (
      <div className="Searchbar">
        <span>
         <input name="search" type="text" placeholder="Search for a movie" ref={this.inputRef} value={this.state.query} onChange={this.change}></input>
        <button name="search" type='button'onClick={this.search}>Search</button>
        </span>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchForMovies: (query) => dispatch(searchMovies(query)),
    buffering: (status) => dispatch(loader(status))
  }
}


export default connect(null, mapDispatchToProps)(SearchBar);
