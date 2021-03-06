import React from "react";
import {withRouter, Route, Switch} from "react-router-dom";

import Details from "./Components/Details";
import Search from "./Components/Search";
import Home from "./Components/Home";

function Routes() {
  return (
    <Switch>
      <Route exact path="/movies/:movieId" component={Details}/>
      <Route exact path="/movies" component={Search}/>
      <Route path="/" component={Home}/>
    </Switch>
  )
}

export default withRouter(Routes)
