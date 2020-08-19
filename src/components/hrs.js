import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Auth from "./auth/login";
import ProjectDB from "./pages/project_dasboard";

export default class App extends Component {
  

  render() {
    return (

      <Switch>
                
        <Route path="/auth" component={Auth}/>
        <Route path="/" component={ProjectDB}/>
        
                
      </Switch>
    );
  }
}
