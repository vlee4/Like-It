import React from "react";
import { connect } from "react-redux";
import {fetchDetails, updateRating, getRatings} from "../Store/moviesReducer";
import {ReactComponent as ThumbUp} from "../images/thumb_up_alt-black-24dp.svg";
import {ReactComponent as ThumbDown} from "../images/thumb_down_alt-black-24dp.svg";
import {ReactComponent as NoImg} from "../images/image-not-found.svg";
import {ReactComponent as BackArrow} from "../images/back-arrow-36dp.svg";
import Image from "react-bootstrap/Image";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Details extends React.Component {
  constructor(){
    super()
    this.state = {
      voted: "", //up/down
    }

    this.vote = this.vote.bind(this);
    this.back = this.back.bind(this);
  }

 async componentDidMount(){
    let {movieId} = this.props.match.params;
    await this.props.getDetails(movieId);
    await this.props.findRatings(movieId);

  }

  async vote(vote){
    if(!this.props.details) return null;
    let voteObj = {
      id: this.props.details.imdbID,
      title: this.props.details.Title
    }
    //toggle from up/down voted already cast
    if(this.state.voted!==""){

      //if current vote is diff than clicked, decrease cur, increase other
      if(this.state.voted!==vote){
        voteObj.upVotes = vote==="up"? 1: -1;
        voteObj.downVotes = vote==="down"? 1: -1;
        this.setState({voted: vote})
      }
      else {
        //if current vote is same as clicked, decrease
        voteObj.upVotes = vote==="up"? -1: 0;
        voteObj.downVotes = vote==="down"? -1: 0;
        this.setState({voted: ""});
      }

      await this.props.updateVote(voteObj)
    }
    else{ //prev vote note selected
      voteObj.upVotes = vote==="up"? 1: 0;
      voteObj.downVotes = vote==="down"? 1: 0;

      await this.props.updateVote(voteObj)
      this.setState({voted: vote})
    }
  }


  back(){
    this.props.history.push("/Movies", {...this.props.movieResults})
  }

  render (){

    const {Actors, Director, Genre, Plot, Poster, Rated, Runtime, Title } = this.props.details? this.props.details: "";
    return (
      <Container className="detailsContainer" fluid="sm xs xl">

        <button className="backBtn" type="button" onClick={this.back}><BackArrow/></button>
       {this.props.details?
       (<Row className="movieContainer" >

         <Col lg={4} xl={4}>
        {Poster!=="N/A"?
        <Image className="detailsPoster" src={Poster} alt={`${Title} Poster`}/>:
         <NoImg className="noImgSvg"/>}</Col>
         <Col lg={8} xl={8}>
         <div className="movieDetails">
            <h2>{Title}</h2>
            <div className="detail">{Plot}</div>
            <hr/>
            <div className="detail"><strong>Director: </strong>{Director}</div>
            <div className="detail"><strong>Actors: </strong>{Actors}</div>
            <div className="detail"><strong>Genre: </strong>{Genre}</div>
            <div className="detail"><strong>Rated: </strong>{Rated}</div>
            <div className="detail"><strong>Runtime: </strong>{Runtime}</div>
         <div className="vote">
           <div>Have you seen this movie? How was it?</div>
           <div className="voteRatings">
             <span>
               <button className={this.state.voted==="up"?"thumb-selected": "thumb"} name="up" value="up" type="button" onClick={()=>this.vote("up")} ><ThumbUp id={`${this.props.match.params.movieId}_up`} /></button>

               <button className={this.state.voted==="down"?"thumb-selected": "thumb"} name="down" value="down" type="button" onClick={()=>this.vote("down")}><ThumbDown id={`${this.props.match.params.movieId}_down`}/></button>
              </span>
            <span className="ratingsStats">{`${this.props.movieResults.ratingsStats.upVotes|""}/${this.props.movieResults.ratingsStats.downVotes|""}`}</span>
           </div>
          </div>
         </div>
         </Col>

       </Row>)
       :(<div >
         <img className="loading" src="/Loading.svg" alt="Loading"></img>
         </div>)}

      </Container>
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
    updateVote: (vote) => dispatch(updateRating(vote)),
    findRatings: (id) => dispatch(getRatings(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
