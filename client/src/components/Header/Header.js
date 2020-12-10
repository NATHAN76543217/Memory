import {Fragment} from 'react';
import { Button } from 'react-bootstrap';
import API from '../../utils/API';
import './Header.css';

function Header ({logged}){
		return(
			<header>
				<h1>Memory</h1>
				{logged ?
					<Button onClick={()=>{API.logout()}} bsClass="log-button" style={{marginLeft: "auto"}}>
						Logout
					</Button>
				:<Fragment>
						<Button onClick={()=>{window.location = "/"}} bsClass="log-button" style={{marginLeft: "auto"}}>
							<div>
								Login
							</div>
						</Button>
						<Button onClick={()=>{window.location = "/signup"}} bsClass="log-button">
							Signup
						</Button>
					</Fragment>}
		</header>);
};

export default Header;