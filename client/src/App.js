import "./App.css";
import React, { Component } from "react";
import { Route, Switch} from "react-router-dom";
import Memory from "./components/Memory/Memory.js";
import Menu from "./components/Menu/Menu.js"
import End from "./components/End/End.js";
import Login from "./components/Account/Login/Login.js";
import Signup from "./components/Account/Signup/Signup.js";
import notFound from './components/Error/404.js';
import { PrivateRoute } from "./components/PrivateRoute.js";
import Header from './components/Header/Header.js';
import API from "./utils/API.js";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header logged={API.isAuth()}/>
        <div className="App-content">
        <TransitionGroup>

        <CSSTransition classNames="pageTransition" timeout={500}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/menu" component={Menu} />
            <PrivateRoute path="/game" component={Memory} />
            <PrivateRoute path="/endgame" component={End} />
            <Route render={notFound} />
          </Switch>
          </CSSTransition>
      </TransitionGroup>      
        </div>
      </div>
    );
  }
}
export default App;