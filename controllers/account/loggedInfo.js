const User = require("../../schema/schemaUser.js");
const LeaderBoard = require("../../schema/schemaLeaderBoard.js");
const jwt = require("jwt-simple");
const config = require("../../config/config");
const TK = require('./token.js');

function getUQueryfromToken(token)
{
	if (TK.is_valid(token) === false)
		return null;
	let {id} = jwt.decode(token, config.secret);
	const findUser = User.findById(id);
	if (!findUser)
		return null;
	return findUser;
}

function getInfo(req, res)
{
	const {token} = req.query;
	const findUser = getUQueryfromToken(token)
	try {
		if (!findUser)
			throw (error);
		findUser.exec((err, user) => {
			if (err) throw (err);
			console.log("User: " + user.name)
			return res.status(200).json({
				name: user.name,
				victories: user.victories,
				defeats: user.defeats,
			});
		});
	} catch (error) {
	return res.status(500).json({"try exept": error });}
}

function result(req, res)
{
	const {token, result, score, nb_card} = req.body;
	const findUser = getUQueryfromToken(token);
	try {
		if (!findUser)
			throw (error);
		findUser.exec((err, user) => {
			if (err) throw (error)
			else if (result === "win")
			{
				user.victories = user.victories + 1;
				user.addScore(score, nb_card);
				console.log("USER|| ");
				console.log(user);
			}
			else
				user.defeats = user.defeats + 1;
			user.save(function(err){
				if(err){
					 console.log(err);
					 return;
			}});
			console.log("RESULT-- " + user.name + " : " + result);
			console.log(user.scores);
			return res.status(200);
		});
	} catch (error) {
	return res.status(500).json({"try exept": error });}
}

async function getScores(req, res)
{
	const {token, nb_card} = req.query;
	const query = getUQueryfromToken(token);
	try
	{
			const gScores = await getScoresGlobal(req, res, nb_card);
			const uScores = await getScoresUser(req, res, query, nb_card);
			console.log("SEND");
			console.log(gScores);
			console.log(uScores);
			return res.status(200).json({
				scores: {
					global: gScores,
					user :uScores
					}
				});	
	}
	catch (error) { return res.status(500).json({"error getScore" : error.name, msg: error.message})}
}

async function getScoresGlobal(req, res, nb_card)
{
	try{
		const board = await LeaderBoard.findOne({name : "leaderBoard_v1"});
		return board.getScores(nb_card);
	}
	catch(error) { return null};
}
async function getScoresUser(req, res, query, nb_card)
{
	var score = "coucou"
	console.log("nb_card = " + nb_card);
	try{
		if (!query)
			throw ("user not found")
		const promise = query.exec();
		const ret = await promise.then((user) => {
			 try {
				score = user.getBestScores(nb_card)
				return score;
			 }catch(error){throw error};
			});
			return ret
	}catch (error) { return res.status(500).json({"function" : "getScoreUser", "name":error.name, "msg":error.message})}
}
exports.getInfo = getInfo;
exports.result = result;
exports.getScores = getScores;
exports.getUQueryfromToken = getUQueryfromToken;