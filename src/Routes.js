import React from "react";
// import {connect} from "react-redux";
import {withRouter, Route, Switch} from "react-router-dom";

import Details from "./Components/Details";
import Search from "./Components/Search";
import Home from "./Components/Home";

function Routes() {
  return (
    <Switch>
      <Route exact path="/Movies/:movieId" component={Details}/>
      <Route exact path="/Movies" component={Search}/>
      <Route path="/" component={Home}/>
    </Switch>
  )
}

export default withRouter(Routes)
