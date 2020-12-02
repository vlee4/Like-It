import Pagination from "react-js-pagination";
import React from "react"
import {searchMovies} from "../Store/moviesReducer";
import {connect} from "react-redux"

class Paginate extends React.Component {
  constructor(){
    super()
    this.state={
      currentPage: 1,
    }

    this.findPage = this.findPage.bind(this)
  }

  componentDidMount(){
    if(this.props.page){
      this.setState({currentPage: this.props.page})
    }
  }

  findPage(pageNum){
    this.setState({currentPage: pageNum})
    this.props.searchForMovies(this.props.query, pageNum)
  }

  render(){
    // let pageNums = Math.ceil(this.props.resultsNum/10);
    // let pages = Array.from(Array(pageNums).keys());

    if(!this.props.resultsNum){
      return (
        <div className="pagination">
          <img className="loading" src="/Loading.svg" alt="Loading"></img>
        </div>
      )
    }

    return (
      <div className="pageNav">
        <Pagination
          hideDisabled
          prevPageText="Prev"
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
          activePage={this.state.currentPage}
          activeClass={"currentPage"}
          itemsCountPerPage={10}
          totalItemsCount={parseInt(this.props.resultsNum, 10)}
          pageRangeDisplayed={5}
          onChange={this.findPage}
        />
      </div>

    )
  }
}


const mapStateToProps = state => {
  return {
   resultsNum: state.movieResults.results.totalResults,
   query: state.movieResults.query,
   page: state.movieResults.page
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchForMovies: (query, page) => dispatch(searchMovies(query, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginate)
