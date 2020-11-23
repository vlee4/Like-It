import axios from "axios";

//ACTIONS
const SEARCH_MOVIES = "SEARCH_MOVIES";

//ACTION CREATORS
const startSearch = (query, movies) => {
  return {
    type: SEARCH_MOVIES,
    query,
    movies
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


//REDUCER
export default function moviesReducer(state ={}, action) {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {...state, query: action.query, results: action.movies}
    default:
      return state;
  }
}
