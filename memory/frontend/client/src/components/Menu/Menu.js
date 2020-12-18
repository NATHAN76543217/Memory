import "./Menu.css";
import API from "../../utils/API.js"

import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import ScoreList from "../ScoreList/ScoreList.js"

function Menu()
{
	//Hooks
	const [nb_card, setNbCard] = useState("5");
	const [user_scores, setUserScores] = useState(["-1"]);
	const [global_scores, setGlobalScores] = useState(["-1"]);

	const handleChange = (event) => {
		console.log("New nb card =" + event.target.value);
		setNbCard(event.target.value);
	  };
	  useEffect(() => {
		async function getScores() {
			const scores = await API.getScores("user", nb_card);
			if(scores != null)
			{
				setUserScores(scores.user);
				setGlobalScores(scores.global);
			}
		}
		getScores();
	 }, [nb_card]);
	console.log("MENU");
	console.log("Score => ");
	console.log(user_scores);
	return (
		<div className="menu">
			<div className="intern">
				<h2>Menu</h2>
				<div className="content">
					<FormControl component="fieldset">
						<FormLabel component="legend">Nombre de paires:</FormLabel>
						<RadioGroup row aria-label="nb_pair" name="nb_pair1" value={nb_card} onChange={handleChange}>
							<FormControlLabel value={"5"} control={<Radio />} label="5" />
							<FormControlLabel value={"7"} control={<Radio />} label="7" />
							<FormControlLabel value={"8"} control={<Radio />} label="8" />
							<FormControlLabel value={"10"} control={<Radio />} label="10" />
							<FormControlLabel value={"12"} control={<Radio />} label="12" />
							<FormControlLabel value={"15"} control={<Radio />} label="15" />
						</RadioGroup>
					</FormControl>
					<div className="scores">
						<ScoreList user_scores={user_scores} global_scores={global_scores}/>				
					</div>
				</div>
				<div>
					<Link to={{
						pathname: "/game",
						data: nb_card, }}>
						<Button variant="contained" color="primary">Let's Play!</Button>
					</Link>
				</div>
			</div>
		</div>);	
}
export default Menu;