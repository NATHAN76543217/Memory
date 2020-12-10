import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../../utils/API";
import "./Login.css";
import "../Account.css"

class Login extends React.Component {
	state = {
		name: "",
		password: "",
		error_msg: ""
	};

	componentWillMount()
	{
		if (API.isAuth())
			window.location = "/menu";
	}
	send = async () => {
		const { name, password } = this.state;
		if (!name || name.length === 0) {
			this.setState({error_msg: "Certains champs sont vide"});
			return;
		}
		if (!password || password.length === 0) {
			this.setState({error_msg: "Certains champs sont vide"});
			return;
		}
		try {
			const { data } = await API.login(name, password);
			localStorage.setItem("token", data.token);
			window.location = "/menu";
		} catch (error) {
			if (error.response)
			{
				console.log("error nb: " + error.response.status);
				if (error.response.status === 400)
					this.setState({error_msg: "Erreur lors de l'envoi de donnée"});
				else if (error.response.status === 401)
					this.setState({error_msg: "L'utilisateur ou le mot de passe est incorrect"});
				return ;
			}
			else
				this.setState({error_msg: "Network Error"});
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
				<FormGroup controlId="name" bsSize="large">
					<ControlLabel>Name</ControlLabel>
					<FormControl
						autoFocus
						type="name"
						value={name}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup controlId="password" bsSize="large">
					<ControlLabel>Password</ControlLabel>
					<FormControl
						value={password}
						onChange={this.handleChange}
						type="password"
					/>
				</FormGroup>
				<Button className="btn-primary" onClick={this.send} block bsSize="large" type="submit">
					Connexion
				</Button>
				<div className="not_yet">
					<span>Pas encore inscrit?</span>
					<Button className="btn-success" onClick={()=> window.location = "/signup"} bsSize="large" type="submit">
						S'inscrire
					</Button>
				</div>

			</div>
		);
	}
}
export default Login;