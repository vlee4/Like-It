import {connect} from "react-redux"
import React from "react"
import {searchMovies} from "../Store/moviesReducer";

class Pages extends React.Component {
  constructor(){
    super()
    this.state={
      firstPage: 1,
      currentPage: 1,
      lastPage: 1,
    }
    this.findPage = this.findPage.bind(this);
    // this.curPageRef = React.createRef();
  }

  componentDidMount(){
    if(this.props.resultsNum){
      this.setState({lastPage: Math.ceil(this.props.resultsNum/10)})
    }
    if(this.props.page){
      this.setState({currentPage: this.props.page})
      document.getElementById(`pgBtn${this.props.page}`).className = "currentPage";
    }
  }

  async findPage(e){
    if(this.props.page){
      let curPage = this.state.currentPage;
      document.getElementById(`pgBtn${curPage}`).className = "";
      console.log("STATE BEFORE", this.state)
      console.log(`${e.target} clicked!`)
      let page = e.target.value;
      await this.props.searchForMovies(this.props.query, page);
      this.setState({currentPage: page});
      document.getElementById(`pgBtn${e.target.value}`).className = "currentPage";
      console.log("STATE AFTER", this.state )}
  }

  render(){
  let pageNums = Math.ceil(this.props.resultsNum/10);
  let pages = Array.from(Array(pageNums).keys());

  if(!this.props.resultsNum){
    return (
      <div className="pagination">
        <img className="loading" src="/Loading.svg" alt="Loading"></img>
      </div>
    )
  }
  //Else, if props have arrived
    return (
      <div className="pagination">
        {pages.map((pg, idx)=>{
          let curPage = ((`pgBtn_${pg+1}`)===this.props.page)? "currentPage": "";
          return (
          <button key={pg+1} id={`pgBtn${pg+1}`} value={pg+1} onClick={this.findPage} className={curPage}>{pg+1}</button>
            )
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
