import axios from "axios";

//ACTIONS
const SEARCH_MOVIES = "SEARCH_MOVIES";

//ACTION CREATORS
const startSearch = (movies) => {
  return {
    type: SEARCH_MOVIES,
    movies
  }
}

//THUNKS
export const searchMovies = (query) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`https://us-central1-like-1t.cloudfunctions.net/movieSearch`, {params: {q: query}})
      dispatch(startSearch(data))
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
      return {...state, results: action.movies}
    default:
      return state;
  }
}
