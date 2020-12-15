import {Fragment} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import './Header.css';

function Header ({logged}){
		return(
			<header className={logged ? "" : "Hnotlogged"}> 
				<Link to={{
						pathname: "/menu",
						}}>
						<h1>Memory</h1>	
					</Link>							
				{logged ?
					<Button onClick={()=>{API.logout()}} className="log-button" style={{marginLeft: "auto"}}>
						Logout
					</Button>
				:<Fragment>
						<Button onClick={()=>{window.location = "/"}} className="log-button notlogged" style={{marginLeft: "auto"}}>
							<div>
								Login
							</div>
						</Button>
						<Button onClick={()=>{window.location = "/signup"}} className="log-button notlogged">
							Signup
						</Button>
					</Fragment>}
		</header>);
};

export default Header;