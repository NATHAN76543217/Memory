import {ListItem, ListItemText} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Tab from "./Tab.js";
import TabNav from "./Tab_Nav.js";
import {useState} from 'react';
import "./ScoreList.js";

const Item = withStyles(() => ({
	root: {
	  height: 20,
	  marginTop: 30,
	  borderRadius: 8,
		Width: 1,
	},
}))(ListItem);

function ScoreList({user_scores, global_scores})
{  
	const [selected, setSelected] = useState("User");
	const scores = (selected === "User" ? user_scores : global_scores);
	var scoreItems = [];
	var names = null;
	if (scores != null)
	{
		for (let i = 0 ; i < scores.length; i++)
		{
			if (selected === "World")
				names = Object.keys(scores[i]);
			scoreItems.push(

				<Item key={i}>
					{selected === "User" ? <ListItemText primary= {
						<p>
							<span>{i + 1} - </span>
							<span>{scores[i]}</span>
						</p>}/>
					: <ListItemText  primary={
					<p>
						<span>{i+1} - </span>
						<span>{names}</span>
						<span>{scores[i][names]}</span>
						</p>}
					/>}
				</Item>

			);
		}
	}
	else
		scoreItems.push("No score yet");

	return(
		<React.Fragment>			
		{"Best Scores"}
			<TabNav tabs={['User', 'World']} selected={ selected } setSelected={setSelected }>
				<Tab isSelected={ selected === 'User'}>
					<p className="subtitles">
						<span>Rank</span>
						<span>Time (s)</span>	
						</p>
					{scoreItems}
				</Tab>
				<Tab isSelected={ selected === 'World' }>
					<p className="subtitles">
						<span>Rank</span>
						<span>Username</span>
						<span>Time (s)</span>	
						</p>
					{scoreItems}
				</Tab>
			</TabNav>

		</React.Fragment>
	)
}

export default ScoreList;