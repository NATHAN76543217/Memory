import Button from '@material-ui/core/Button'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import API from '../../utils/API';
import ScoreList from "../ScoreList/ScoreList.js";
import "./End.css";

//get User data
async function getUser(setUser)
{
    await API.getUserInfo().then((res) => (res && setUser(res.data))).catch(setUser("null"));
}

function End()
{
    const [user, setUser] = useState(null);
	const [scores_list, setScoresList] = useState(["-1"]);

    const nb_card   = localStorage.getItem("nb_pair");
    const res       = localStorage.getItem("last");
    useEffect(() => {
		async function getScores() {
			const scores = await API.getScores("user", nb_card);
			setScoresList(scores);
		}
		getScores();
     }, []);
    (!user && getUser(setUser));
    console.log(user);
    //  const user = getUser();
    return (
		<div class="end">
            <div class="inner">
                <h1>{(res === "win" ? "You Win!" : "You loose..." )}</h1>
                {user && <span>V {user.victories} | {user.defeats} D</span>}
                {res === "win" && <span>You flipped all the {nb_card} pairs!</span>}
                {res === "loose" && <span>You have {localStorage.getItem("pair_left")} pairs left :(</span>}
                <div class="content">
                    <Link to={{
                    pathname: "/game",
                    data: nb_card, }}>
                        <Button color="primary" variant="contained" block>Retry?</Button>
                    </Link>
                    <div class="scores">
                        <ScoreList scores={scores_list}/>
                    </div>
                    <Button color="primary" variant="contained" onClick={() => window.location = "/menu"} block>Return to Menu</Button>
                </div>
            </div>
		</div>);
}
export default End;
