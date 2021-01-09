import axios from "axios";

//ACTIONS
const SEARCH_MOVIES = "SEARCH_MOVIES";
const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
const UPDATE_VOTE = "UPDATE_VOTE";
const GET_RATING = "GET_RATING";
const LOADING = "LOADING";

//ACTION CREATORS
const startSearch = (query, movies, page) => {
  return {
    type: SEARCH_MOVIES,
    query,
    movies,
    page
  }
}

const fetchMovie = (details) => {
  return {
    type: GET_MOVIE_DETAILS,
    details
  }
}

const adjustVote = (update, data) => {
  return {
    type: UPDATE_VOTE,
    update,
    data
  }
}

const fetchRating = (ratings) => {
  return {
    type: GET_RATING,
    ratings
  }
}

export const loader = (status) => {
  return {
    type: LOADING,
    status
  }
}

//THUNKS (CREATORS)
export const searchMovies = (query, page=1) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`https://us-central1-like-1t.cloudfunctions.net/movieSearch`, {params: {q: query, page}})
      dispatch(startSearch(query, data, page))
    }
    catch(error){
      console.log("Error searching for movies", error)
    }
  }
}

export const fetchDetails = (id) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`https://us-central1-like-1t.cloudfunctions.net/movieSearch/<id>`, {params: {id}})
      dispatch(fetchMovie(data))
    } catch(error) {
      console.log("Error getting movie details", error)
    }
  }
}


export const updateRating = (vote) => {
  return async dispatch => {
    try {
      let {data} = await axios.post(`https://us-central1-like-1t.cloudfunctions.net/movieSearch/${vote.id}`, {...vote} )
      dispatch(adjustVote(vote, data))
    } catch(error) {
      console.log("Error updating movie's ratings", error)
    }
  }
}

export const getRatings = (id) => {
  return async dispatch => {
    try{
       let {data} = await axios.get(`https://us-central1-like-1t.cloudfunctions.net/movieSearch/<id>/ratings`, {params: {id}});
       dispatch(fetchRating(data))
    } catch (error) {
      console.log("Error getting movie's ratings", error)
    }
  }
}


//REDUCER
export default function moviesReducer(state ={page:1, ratingsStats: {upVotes:0, downVotes:0}, vote:{upVotes:0, downVotes: 0}, loading: false}, action) {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {...state, query: action.query, results: action.movies, page: action.page, loading: false}
    case GET_MOVIE_DETAILS:
      return {...state, details: action.details, loading: false}
    case UPDATE_VOTE:
      let {upVotes, downVotes} = action.update
      let updatedUp = upVotes+state.vote.upVotes;
      let updatedDown = downVotes+state.vote.downVotes;
      return {...state, vote: {upVotes: updatedUp, downVotes: updatedDown}, ratingsStats: {...action.data}, loading: false}
    case GET_RATING:
      return {...state, ratingsStats: action.ratings, loading: false}
    case LOADING:
      return {...state, loading: action.status}
    default:
      return state;
  }
}
