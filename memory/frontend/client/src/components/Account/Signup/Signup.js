import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../../utils/API";
import "./Signup.css";
import "../Account.css"

class Signup extends React.Component {
	state = {
		name: "",
		password: "",
		cpassword: "",
		error_msg: "",
	};
	send = async () => {
		const { name, password, cpassword } = this.state;

		//vérification coté client
		if (!name || name.length === 0) {this.setState({error_msg: "La saisie de nom est obligatoire"});return};
		if (!password || password.length === 0) {this.setState({error_msg: "La saisie de mot de passe est obligatoire"});return};
		if (password !== cpassword) {this.setState({error_msg: "Les deux mots de passe ne sont pas identiques"});return};
		try {
			const { data } = await API.signup({ name, password });
			localStorage.setItem("token", data.token);
			window.location = "/menu";
		} catch (error) {
			if (error.response)
			{
				if (error.response.status === 400)
					this.setState({error_msg: error.response.data.text});
				else if (error.response.status === 401)
					this.setState({error_msg: "L'utilisateur ou le mot de passe est incorrect"});
				return;
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
	const { name, password, cpassword } = this.state;
	return (
	  <div className="Account Signup">
			<h2>Signup</h2>
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
				<FormGroup controlId="cpassword" bssize="large">
				<FormLabel>Confirm Password</FormLabel>
				<FormControl
					value={cpassword}
					onChange={this.handleChange}
					type="password"
				/>
			</FormGroup>
			<Button className="btn-primary" onClick={this.send} block bssize="large" type="submit">
				Inscription
			</Button>
	  </div>
	);
  }
}
export default Signup;