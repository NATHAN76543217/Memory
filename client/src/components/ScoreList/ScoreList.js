import {List, ListItem, ListItemText} from '@material-ui/core'
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
	  backgroundColor: "#999999",
	  borderRadius: 8,
		Width: 1,
	},
}))(ListItem);

function ScoreList({user_scores, scope, global_scores})
{  

	const [selected, setSelected] = useState("User");
	var scoreItems = [];
	const scores = selected === "User" ? user_scores : global_scores;
	var k = null;
	if (scores != null)
	{
		for (let i = 0 ; i < scores.length; i++)
		{
			if (selected === "World")
				k = Object.keys(scores[i]);
			scoreItems.push(
				<Item>
					{selected === "User" ? <ListItemText primary= {(i+1) + "-\t\t" + scores[i]}/>
					: <ListItemText primary={(i+1 + " - " + k + "\t" + scores[i][k])}/>}
				</Item>
			);
		}
		console.log("items");
		console.log(scoreItems);
	}
	else
		scoreItems.push("No score yet");

	return(
		<React.Fragment>			
		{"Best Scores"}
		<TabNav tabs={['User', 'World']} selected={ selected } setSelected={setSelected }>
		  <Tab isSelected={ selected === 'User'}>
				{scoreItems}
		  </Tab>
		  <Tab isSelected={ selected === 'World' }>
			<List>
				{scoreItems}
			</List>
		  </Tab>
		</TabNav>
		</React.Fragment>
	)
}

export default ScoreList;