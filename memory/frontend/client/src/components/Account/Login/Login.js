import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../../utils/API";
import "./Login.css";
import "../Account.css"

class Login extends React.Component {
	state = {
		name: "",
		password: "",
		error_msg: ""
	};

	send = async () => {
		const { name, password } = this.state;
		if (!name || name.length === 0 || !password || password.length === 0) {
			this.setState({error_msg: "Certains champs sont vide"});
			return;
		}
		try {
			const { data } = await API.login(name, password);
			localStorage.setItem("token", data.token);
			window.location = "/menu"; //login sucess, redirect to menu page
		}catch (error) {
			let error_msg = "";
			if (!error.response)
				error_msg = "Network Error";
			else{
				switch (error.response.status){
					case 400:
						error_msg = "Erreur lors de l'envoi de donnée";
						break;
					case 401:
						error_msg = "L'utilisateur ou le mot de passe est incorrect";
						break;
					case 500:
						error_msg = "Server error";
						break;
					case 503:
						error_msg = "error while connecting to database";
						break;
					default:
						error_msg = "An error has occurred";
						break;
					}
				}
				this.setState({error_msg: error_msg});
			}
	};
	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};
	render() {
		const { name, password } = this.state;
		return (
			<div className="Account Login">
				<h2>Login</h2>
				<span className="error">{this.state.error_msg}</span>
				<FormGroup controlId="name" bssize="large">
					<FormLabel>Name</FormLabel>
					<FormControl
						autoFocus
						type="name"
						value={name}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup controlId="password" bssize="large">
					<FormLabel>Password</FormLabel>
					<FormControl
						value={password}
						onChange={this.handleChange}
						type="password"
					/>
				</FormGroup>
				<Button className="btn-primary" onClick={this.send} block bssize="large" type="submit">
					Connexion
				</Button>
				<div className="not_yet">
					<span>Pas encore inscrit?</span>
					<Button className="btn-success" onClick={()=> window.location = "/signup"} bssize="large" type="submit">
						S'inscrire
					</Button>
				</div>

			</div>
		);
	}
}
export default Login;