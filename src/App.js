import './App.css';
import React from "react";
import Routes from "./Routes"


class App extends React.Component {

render(){
  return (
    <div className="App">
      <h1 id="title">Like 1t</h1>
      <div className="content">
        <Routes/>
      </div>
      <footer>
        <div>Last updated: November 2020</div>
        <div>Created by vLEE</div>
        <div><a href="https://github.com/vlee4/Like-It">Source Code</a></div>
      </footer>
    </div>
  );
}
}

export default App;
