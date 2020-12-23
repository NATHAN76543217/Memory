import Button from '@material-ui/core/Button'
import React from 'react';
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
    //localstorage
    const nb_card   = localStorage.getItem("nb_pair");
    const res       = localStorage.getItem("last");
    const time_elapsed = localStorage.getItem("time_elapsed");
    const pair_left = localStorage.getItem("pair_left");
    
    //Hooks
    const [user, setUser] = useState(null);
	const [user_scores, setUserScores] = useState(null);
	const [global_scores, setGlobalScores] = useState(null);
    //effect
    useEffect(() => {
		async function getScores() {
            try {
                const scores = await API.getScores("user", nb_card);
                setUserScores(scores.user);
                setGlobalScores(scores.global);                
            } catch ({error}) {
                console.error(error);
            }
        }
        getScores();
     }, [nb_card]);
    (!user && getUser(setUser));
    
    //render
    return (
		<div className="end">
            <div className="inner">
                <h1>{(res === "win" ? "You Win!" : "You loose..." )}</h1>
                {user && <span>V {user.victories} | {user.defeats} D</span>}
                {res === "win" &&
                    <React.Fragment>
                        <span>You flipped all the {nb_card} pairs!</span>
                        <span>in {time_elapsed} seconds</span>
                    </React.Fragment>}
                {res === "loose" && <span>You have {pair_left} pairs left :(</span>}
                <div className="content">
                    <Link to={{
                    pathname: "/game",
                    data: nb_card, }}>
                        <Button color="primary" variant="contained">Retry?</Button>
                    </Link>
                    <div className="scores">
                        <ScoreList user_scores={user_scores} global_scores={global_scores}/>
                    </div>
                    <Link to={{
                    pathname: "/menu",
                    }}>
                       <Button color="primary" variant="contained">Return to Menu</Button>
                    </Link>
                </div>
            </div>
		</div>);
}
export default End;
