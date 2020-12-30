import "./App.css";
import React, { Component } from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Memory from "./components/Memory/Memory.js";
import Menu from "./components/Menu/Menu.js"
import End from "./components/End/End.js";
import Login from "./components/Account/Login/Login.js";
import Signup from "./components/Account/Signup/Signup.js";
import notFound from './components/Error/404.js';
import { PrivateRoute } from "./routes/PrivateRoute.js";
import Header from './components/Header/Header.js';
import API from "./utils/API.js";

class App extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			logged: undefined,
		};
	}
	async checkAuth()
	{
		const res = await API.isAuth();
		console.log("res = :" + res);
		this.setState({logged: res});
	}
	render() {

		if (this.state.logged === undefined)
			this.checkAuth();
		return (
			<div className="App">
				<Header logged={this.state.logged}/>
				<div className="App-content">
					<Switch>
						<Route exact path="/" render={()=> {return (this.state.logged ? 
							<Redirect to={{ pathname: '/menu'}}/>
							: <Login/>)}} />
						<Route exact path="/signup" render={()=> {return (this.state.logged ? 
							<Redirect to={{ pathname: '/menu'}}/>
							: <Signup/>)}} />
						<PrivateRoute isAuth={this.state.logged} path="/menu" component={Menu} />
						<PrivateRoute isAuth={this.state.logged} path="/game" component={Memory} />
						<PrivateRoute isAuth={this.state.logged} path="/endgame" component={End} />
						<Route render={notFound} />
					</Switch>
				</div>
			</div>
		);
	}
}
export default App;