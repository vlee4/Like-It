import logo from './logo.svg';
import './App.css';
import React from "react";
import firebase from "firebase";


class App extends React.Component {
  //database.ref refers to root of db, child("key") creates a child key on that object called "key"
  // const dbRef = firebase.database().ref().child()
  constructor(){
    super()
    this.state = {
      movieName: "Spirited Away"
    }
  }

  componentDidMount(){
    const dbRef = firebase.database().ref().child('movies');
    const movieRef = dbRef.child("movieName");
    movieRef.on("value", snap=>{
      this.setState({
        movieName: snap.val()
      })
    })
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
