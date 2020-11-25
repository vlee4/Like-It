import axios from "axios";

//ACTIONS
const SEARCH_MOVIES = "SEARCH_MOVIES";
const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
const UPDATE_VOTE = "UPDATE_VOTE";

//ACTION CREATORS
const startSearch = (query, movies) => {
  return {
    type: SEARCH_MOVIES,
    query,
    movies
  }
}

const fetchMovie = (details) => {
  return {
    type: GET_MOVIE_DETAILS,
    details
  }
}

const adjustVote = (update) => {
  return {
    type: UPDATE_VOTE,
    update
  }
}

//THUNKS
export const searchMovies = (query) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`https://us-central1-like-1t.cloudfunctions.net/movieSearch`, {params: {q: query}})
      dispatch(startSearch(query, data))
    }
    catch(error){
      console.log("Error searching for movies", error)
    }
  }
}

export const fetchDetails = (id) => {
  return async dispatch => {
    try {
      //make call w/ firebase functions
      const {data} = await axios.get(`https://us-central1-like-1t.cloudfunctions.net/movieSearch/<id>`, {params: {id}})
      console.log("In redux store, getDetails")
      dispatch(fetchMovie(data))
    } catch(error) {
      console.log("Error getting movie details", error)
    }
  }
}

export const updateRating = (vote) => {
  return async dispatch => {
    try {
      //update db
      let {status} = await axios.post({
        method: "post",
        params: {id: vote.id},
        url: `https://us-central1-like-1t.cloudfunctions.net/movieSearch/<id>`,
        data: {...vote}
      })
      console.log("In redux store, updatingRating. Status=",status)
      dispatch(adjustVote(vote))
    } catch(error) {
      console.log("Error updating movie's ratings", error)
    }
  }
}


//REDUCER
export default function moviesReducer(state ={}, action) {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {...state, query: action.query, results: action.movies}
    case GET_MOVIE_DETAILS:
      return {...state, details: action.details}
    case UPDATE_VOTE:
      let updatedDetails = {...state.details, vote: action.update}
      return {...state, details: updatedDetails}
    default:
      return state;
  }
}
