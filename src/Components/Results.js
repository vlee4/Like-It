import {connect} from "react-redux";
// import Pages from "./Pages";
import Paginate from "./Pagination";
import {fetchDetails, searchMovies} from "../Store/moviesReducer"
import {Link} from "react-router-dom";
import {ReactComponent as NoImg} from "../images/image-not-found.svg";

function Results(props) {
  console.log("Props", props)
  if(!props.query){
    return (
      <div className="container">
        Type in a movie name to search
      </div>
    )
  }else if(!props.results){
    return (
      <div><span>Loading...</span>
         <img className="loading" src="../images/Loading.svg" alt="Loading"></img>
      </div>
    )
  }
  else if(props.query && props.results.Response==="False"){
    return (
      <div className="container">Sorry, no results for {props.query} </div>
      )
    }
  return (
    <div className="container">
      {props.results.Response?
      (<div>
          <div className="resultNums">There is {props.results.totalResults} results for '{props.query}'</div>
           <div className="allMovies">
             {props.results.Search.map((movie, idx) => {
               return (
                 <div key={`${idx}_${movie.imdbID}`} className=
                 "singleResult">
                   <div className="posterContainer">
                   {movie.Poster!=="N/A"?<img src={movie.Poster} alt={`${movie.Title} poster`} ></img>:<NoImg className="noImgSvg"/>}</div>
                   <div className="movieInfo">
                      <Link to={`/Movies/${movie.imdbID}`}><div>{movie.Title}</div></Link>
                      <div>{movie.Year}</div>
                   </div>
                 </div>
               )
            })}</div>
      </div>):
      <div>Sorry, no results were found for that query</div>
      }
      {/* {(props.results.totalResults>0)?(<Pages/>):""} */}
      {(props.results.totalResults>0)?(<Paginate/>):""}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    results: state.movieResults.results,
    query: state.movieResults.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDetails: (id) => dispatch(fetchDetails(id)),
    searchForMovies: (query, page) => dispatch(searchMovies(query, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
