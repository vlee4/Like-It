import React from "react";
import { connect } from "react-redux";
import {fetchDetails} from "../Store/moviesReducer";
// import "images/svg-defs.svg";
import {ReactComponent as ThumbUp} from "../images/thumb_up_alt-black-24dp.svg";
import {ReactComponent as ThumbDown} from "../images/thumb_down_alt-black-24dp.svg";
// import {ReactComponent as Loading} from "../images/Loading.svg";

class Details extends React.Component {
  constructor(){
    super()

    this.vote = this.vote.bind(this);
  }

 async componentDidMount(){
    let {movieId} = this.props.match.params;
    await this.props.getDetails(movieId)
  }

  vote(e){
    let rating = e.target.alt==="thumb_up"? "up": "down";
    console.log(`${rating} vote received`, e.target)
  }

  render (){
    console.log("Here's the details", this.props.details)
    const {Actors, Director, Genre, Plot, Poster, Rated, Runtime, Title } = this.props.details? this.props.details: "";
    return (
      <div className="container">
       {this.props.details?
       (<div className="movieContainer">
         <img src={Poster} alt={`${Title} Poster`}></img>
         <div className="movieDetails">
            <h2>{Title}</h2>
            <div className="detail">{Plot}</div>
            <div className="detail"><strong>Director:</strong>{Director}</div>
            <div className="detail"><strong>Actors:</strong>{Actors}</div>
            <div className="detail"><strong>Genre: </strong>{Genre}</div>
            <div className="detail"><strong>Rated: </strong>{Rated}</div>
            <div className="detail"><strong>Runtime: </strong>{Runtime}</div>
         <div className="vote">
           <div>Have you seen this movie? How was it?</div>
           <div className="voteRatings">
             <span>
               <ThumbUp className="thumb" />
               <ThumbDown className="thumb"/>
              </span>
            <span>[Current Rating Here]</span>
           </div>
          </div>
         </div>
       </div>)
       :(<div >
         <img className="loading" src="/Loading.svg" alt="Loading"></img>
         </div>)}
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    details: state.movieResults.details
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDetails: (id) => dispatch(fetchDetails(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)

/*
Actors: "Connie Nielsen, Aidan Quinn, John Bell, Jack Gleeson"
Awards: "4 wins & 8 nominations."
BoxOffice: "N/A"
Country: "Canada, Ireland"
DVD: "N/A"
Director: "Vic Sarin"
Genre: "Drama, Family"
Language: "English"
Metascore: "52"
Plot: ...
Poster: "https://m.media-amazon.com/images/M/MV5BMjE4ODc3MDQ0NV5BMl5BanBnXkFtZTcwMjI3NTkyMw@@._V1_SX300.jpg"
Production: "N/A"
Rated: "PG"
Ratings: (3) [{…}, {…}, {…}]
Released: "13 Feb 2010"
Response: "True"
Runtime: "101 min"
Title: "A Shine of Rainbows"
Type: "movie"
Website: "N/A"
Writer: "Vic Sarin, Catherine Spear, Dennis Foon, Lillian Beckwith (novel)"
Year: "2009"
imdbID: "tt1014774"
imdbRating: "7.1"
imdbVotes: "2,153"
*/
