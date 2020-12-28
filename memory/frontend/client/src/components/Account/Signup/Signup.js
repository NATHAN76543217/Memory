import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../../utils/API";
import "./Signup.css";
import "../Account.css"

class Signup extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		cpassword: "",
		error_msg: "",
	};
	send = async () => {
		const { name, email, password, cpassword } = this.state;

		//vérification coté client
		if (!name || name.length === 0) {this.setState({error_msg: "La saisie de nom est obligatoire"});return}
		else if (!email || email.length === 0) {this.setState({error_msg: "La saisie d'email est obligatoire"});return}
		else if (!password || password.length === 0) {this.setState({error_msg: "La saisie de mot de passe est obligatoire"});return}
		else if (password !== cpassword) {this.setState({error_msg: "Les deux mots de passe ne sont pas identiques"});return};
		try {
			const { data } = await API.signup({ name, password, email});
			localStorage.setItem("token", data.token);
			window.location = "/menu";
		} catch (error) {
			let error_msg = "";
			if (!error.response)
				error_msg = "Network Error";
			else{
				switch (error.response.status){
					case 400:
						error_msg = error.response.data.text;
						break;
					case 500:
						error_msg = "Server error";
						break;
					case 503:
						error_msg = "error while connecting to database";
						break;
					default:
						error_msg = "An error has occurred";
						break;}
				}
				this.setState({error_msg: error_msg});
				return ;
		}
	};
  handleChange = (event) => {
	this.setState({
	  [event.target.id]: event.target.value
	});
  };
  render() {
	const { name, email, password, cpassword } = this.state;
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
			<FormGroup controlId="email" bssize="large">
				<FormLabel>Email</FormLabel>
				<FormControl
					autoFocus
					type="email"
					value={email}
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