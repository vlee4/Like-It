import React from "react";
import { connect } from "react-redux";
import {fetchDetails} from "../Store/moviesReducer"

class Details extends React.Component {

 async componentDidMount(){
    let {movieId} = this.props.match.params;
    await this.props.getDetails(movieId)
    console.log("movie id:", movieId)
  }

  render (){
    return (
      <div className="container">
       {this.props.details?(<div>Details arrived</div>):(<div>Loading</div>)}
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
