import {connect} from "react-redux"

function Results(props) {
  console.log("Props", props)
  if(!props.query){
    return (
      <div className="results">
        Type in a movie name to search
      </div>
    )
  }
  else if(props.query && props.results.Response==="False"){
    return (
      <div>Sorry, no results for {props.query} </div>
      )
    }
  else if(props.query && (!props.results)){
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="results">
      {props.results.Response?
      (<div>
          <div>There are {props.results.totalResults} for '{props.query} '</div>
           <div className="allMovies">
             {props.results.Search.map((movie, idx) => {
               let noImg = (movie.Poster==="N/A")? "noImgSvg":"";
               return (
                 <div key={`${idx}_${movie.imdbID}`} className=
                 "singleResult">
                   <img src={(movie.Poster!=="N/A")?(movie.Poster):"/images/image-not-found.svg"} alt={`${movie.Title} poster`} className={noImg}></img>
                   <div className="movieInfo">
                      <div>{movie.Title}</div>
                      <div>{movie.Year}</div>
                   </div>
                 </div>
               )
            })}</div>
      </div>):
      <div>Sorry, no results where found for that query</div>
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

export default connect(mapStateToProps)(Results)
