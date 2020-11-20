import logo from './logo.svg';
import './App.css';
import React from "react";
import firebase from "firebase";
// import "firebase/database";
// import axios from "axios";
// import dotenv from "dotenv";
require('dotenv').config();

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      movieName: "Spirited Away"
    }
  }
  //Testing that db syncs
 async componentDidMount(){
    const dbRef = firebase.database().ref().child('movies');
    const movieRef = dbRef.child("movieName");
    //when the value of the movie ref changes that value will be set to movieName on local state
    movieRef.on("value", snap=>{
      this.setState({
        movieName: snap.val()
      })
    })
    // const firebaseGreeting = firebase.functions().httpsCallable("helloWorld");
    // firebaseGreeting().then(function(value){
    //   console.log("Data from firebaseGreeting", value.data)
    // })

    const firebaseMovieSearch = firebase.functions().httpsCallable("movieSearch");
    firebaseMovieSearch("Clannad").then(function(value){
      console.log("Data from firebaseMovieSearch", value)
    })
    // let API_KEY = process.env.REACT_APP_API_KEY
    // let query = this.state.movieName;
    // let data =  await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    // console.log("DATA", data)
  }

render(){
  return (
    <div className="App">
      <h1>I Like It</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{this.state.movieName}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
}

export default App;
