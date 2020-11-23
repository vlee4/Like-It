import React from "react";
import { connect } from "react-redux";
import {fetchDetails} from "../Store/moviesReducer"

class Details extends React.Component {

  componentDidMount(){
    this.props.getDetails()
  }

  return (){
    return (
      <div className="details">
        Details
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
