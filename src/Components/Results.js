import {connect} from "react-redux"

function Results(props) {
  console.log("Props", props)
  if(!props.results){
    return (
      <div className="results">
        Type in a movie name to search
      </div>
    )
  }
  return (
    <div className="results">
      {props.results.Response?
      (<div>
          <div>There are {props.results.totalResults} for that search</div>
           <div className="allMovies">
             {props.results.Search.map((movie, idx) => {
               return (
                 <div key={`${idx}_${movie.imdbID}`} className=
                 "singleResult">
                   <img src={movie.Poster} alt={`${movie.Title} poster`}></img>
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
    results: state.movieResults.results
  }
}

export default connect(mapStateToProps)(Results)
