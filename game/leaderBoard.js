const User = require('../schema/schemaUser.js');
const LeaderBoard = require('../schema/schemaLeaderBoard.js');

async function save_leaderboard(leaderboard_scores)
{
	try{

	
	var leaderboard = await LeaderBoard.findOne({name: "leaderBoard_v1"});
	console.log(leaderboard);

	if (leaderboard == null)
		leaderboard = new LeaderBoard({name: "leaderBoard_v1", scores : leaderboard_scores});
	else
		leaderboard.scores = leaderboard_scores;
	console.log("Lead");
	console.log(leaderboard);
	await leaderboard.save();
	}
	catch (error) {console.error(error)}
}

function parse(scores)
{
	let leader = {};
	for (const key of Object.keys(scores))
	{
		console.log(scores[key]);
		//if (scores[key] == null)
		//    break;//cause to user not well formated
		scores[key].sort((a, b)=> {
			return parseInt(a[Object.keys(a)[0]]) - parseInt(b[Object.keys(b)[0]])});
		if (leader[key] == null)
			leader[key] = scores[key].slice(0, 10);
		else
			leader[key] = scores[key].slice(0, 10)
	}
	return leader;
}
async function compute()
{
	var leaderboard;
	var scores = {};
	console.log("IN COMPUTE")
	try
	{
		for await (const doc of User.find()) {
			// use `doc`
			console.log("--name");
			console.log(doc.name);

			if (doc.scores == null)
				continue;
			var scoresKeys = Object.keys(doc.scores);
			console.log("scorekey=")
			console.log(scoresKeys);
			for (const key of scoresKeys)
			{
				if (scores[key] == null)
				{
					scores[key] = doc.getBestScores(key).map(element => {
						const ret = {[doc.name] : element};
						return ret;
						});
					console.log(scores[key]);
				}
				else
					scores[key].push(...doc.getBestScores(key).map(element => {const ret = {[doc.name] : element}; return ret}));
			}
		}

		//scores = json of all scores
		leaderboard = parse(scores);

		console.log("leaderboard");
		console.log(leaderboard);
		await save_leaderboard(leaderboard);
	}
	catch {(error) => {
		console.log("IN LEADERBOARD");
		console.error(error)}};
}
exports.compute = compute; 