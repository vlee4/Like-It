import {connect} from "react-redux"
import {fetchDetails} from "../Store/moviesReducer"
import {Link} from "react-router-dom";

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
         <img className="loading" src="/images/Loading.svg" alt="Loading"></img>
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
          <div>There are {props.results.totalResults} for '{props.query}'</div>
           <div className="allMovies">
             {props.results.Search.map((movie, idx) => {
               let noImg = (movie.Poster==="N/A")? "noImgSvg":"";
               return (
                 <div key={`${idx}_${movie.imdbID}`} className=
                 "singleResult">
                   <img src={(movie.Poster!=="N/A")?(movie.Poster):"/images/image-not-found.svg"} alt={`${movie.Title} poster`} className={noImg}></img>
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
    getDetails: (id) => dispatch(fetchDetails(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
