import logo from './logo.svg';
import './App.css';
import React from "react";
import firebase from "firebase";
// import axios from 'axios';
// import "firebase/database";
require('dotenv').config();

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      movieName: "Spirited Away",
      query: ''
    }
    this.change = this.change.bind(this)
    this.search = this.search.bind(this)
    this.inputRef = React.createRef();
  }
  //Testing that db syncs
 async componentDidMount(){
    // const dbRef = firebase.database().ref().child('movies');
    // const movieRef = dbRef.child("movieName");
    // //when the value of the movie ref changes that value will be set to movieName on local state
    // movieRef.on("value", snap=>{
    //   this.setState({
    //     movieName: snap.val()
    //   })
    // })
  //   let query = "Sky Castle"
  //  let {data} = await axios.get(`https://us-central1-like-1t.cloudfunctions.net/movieSearch`, {params: {q: query}});
  //  console.log("Data to front", data)
  }
  change(e){
    console.log("new value", this.inputRef.current.value)
    this.setState({query: this.inputRef.current.value})
  }
  async search(){
    if(this.state.query!==""){
      let exists;
      let dbRef = firebase.database().ref(`movies`);
      await dbRef.once("value")
        .then((snapshot)=>{
          exists = snapshot.child(this.state.query).exists() ? "Y":"N";
        })
      if(exists==="N"){
      console.log("doesn't exists")
      //doesn't exist
      firebase.database().ref(`movies/${this.state.query}`).set({
          id: "id would go here",
          name: this.state.query,
          upvote: 0,
          downvote: 0,
        })
      } else { //exists, update instead
        console.log("exist")
        firebase.database().ref(`movies/${this.state.query}/upvote`)
          .transaction(currentVote=>{
            return currentVote+1;
        })
      }

      this.setState({query: "", movieName: this.state.query})
  }
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
        <div>
      <input name="search" placeholder="Search for a movie" ref={this.inputRef} value={this.state.query} onChange={this.change}></input>
      <button name="search" type='button'onClick={this.search}>Search</button>
      </div>
      </header>
    </div>
  );
}
}

export default App;
