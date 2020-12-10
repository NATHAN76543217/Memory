import { Button } from 'react-bootstrap';
import './Header.css';

function Header (){
		console.log("Basic Header");
		return(
		<header>
			<h1>Memory</h1>
            <Button onClick={()=>{window.location = "/"}} bsClass="log-button" style={{marginLeft: "auto"}}>
                Login
            </Button>
            <Button onClick={()=>{window.location = "/signup"}} bsClass="log-button">
                Signup
            </Button>
		</header>)
};

export default Header;