import React from "react";
import { connect } from "react-redux";
import {fetchDetails, updateRating} from "../Store/moviesReducer";
import {ReactComponent as ThumbUp} from "../images/thumb_up_alt-black-24dp.svg";
import {ReactComponent as ThumbDown} from "../images/thumb_down_alt-black-24dp.svg";
// import {ReactComponent as Loading} from "../images/Loading.svg";

class Details extends React.Component {
  constructor(){
    super()

    this.vote = this.vote.bind(this);
    this.back = this.back.bind(this);
  }

 async componentDidMount(){
    let {movieId} = this.props.match.params;
    await this.props.getDetails(movieId)
    console.log("Props", this.props)
  }

  vote(vote){
    if(!this.props.details) return null;
    let rating = vote==="up"? "up": "down";
    let upVotes = vote==="up"? 1: 0;
    let downVotes = vote==="down"? 1: 0;
    let voteObj = {
      id: this.props.details.imdbID,
      title: this.props.details.Title,
      upVotes,
      downVotes,
    }
    this.props.updateVote(voteObj)

    console.log(`${rating} vote received`, vote, "vote", voteObj)
  }

  back(){
    this.props.history.push("/Movies", {...this.props.movieResults})
  }

  render (){
    console.log("Here's the details", this.props.details)
    const {Actors, Director, Genre, Plot, Poster, Rated, Runtime, Title } = this.props.details? this.props.details: "";
    return (
      <div className="container">
        <button className="backBtn" type="button" onClick={this.back}>Back</button>
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
               <ThumbUp className="thumb" onClick={()=>this.vote("up")} />
               <ThumbDown className="thumb" onClick={()=>this.vote("down")}/>
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
    details: state.movieResults.details,
    movieResults: state.movieResults
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDetails: (id) => dispatch(fetchDetails(id)),
    updateVote: (vote) => dispatch(updateRating(vote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)

/*
Example of details received from a specific movie id query:
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
