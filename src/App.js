import './App.css';
import React from "react";
// import firebase from "firebase";
import SearchBar from "./Components/SearchBar";
import Results from "./Components/Results"
// require('dotenv').config();

class App extends React.Component {

render(){
  return (
    <div className="App">
      <h1>Like 1t</h1>
      <div className="content">
      <SearchBar/>
      <Results/>
      </div>
    </div>
  );
}
}

export default App;
