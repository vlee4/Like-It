import {connect} from "react-redux";
import Paginate from "./Pagination";
import {fetchDetails, searchMovies} from "../Store/moviesReducer"
import {Link} from "react-router-dom";
import {ReactComponent as NoImg} from "../images/image-not-found.svg";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Results(props) {
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
    <Container fluid className="container">
      {props.results.Response?
      (<div>
          <div className="resultNums">There is {props.results.totalResults} results for '{props.query}'</div>
           <div className="allMovies">
             <Row xs={1} sm={1} md={2} lg={4} xl={4}>
             {props.results.Search.map((movie, idx, arr) => {
               let onlyResult = (arr.length>1) ? "": "onlyResult";
               return (
                 <Col className={onlyResult} key={`${idx}_${movie.imdbID}`}>
                 <Card className=
                 "singleResult">
                   <div className="posterContainer">
                   {movie.Poster!=="N/A"?
                   <Card.Img src={movie.Poster} alt={`${movie.Title} poster`}/>:
                   <NoImg className="noImgSvg"/>}
                   </div>
                   <div className="movieInfo">
                      <Link to={`/Movies/${movie.imdbID}`}><Card.Title>{movie.Title}</Card.Title></Link>
                      <Card.Text>{movie.Year}</Card.Text>
                   </div>
                 </Card></Col>
               )
            })}</Row></div>
      </div>):
      <div>Sorry, no results were found for that query</div>
      }
      {(props.results.totalResults>0)?(<Paginate/>):""}
    </Container>
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
