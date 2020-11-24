import './App.css';
import React from "react";
// import firebase from "firebase";
// import SearchBar from "./Components/SearchBar";
// import Results from "./Components/Results"
import Routes from "./Routes"
// import Search from "./Components/Search"
// require('dotenv').config();

class App extends React.Component {

render(){
  return (
    <div className="App">
      <h1 id="title">Like 1t</h1>
      <div className="content">
      {/* <SearchBar/>
      <Results/> */}
      <Routes/>
      </div>
    </div>
  );
}
}

export default App;
