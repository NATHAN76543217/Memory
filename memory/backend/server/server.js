//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const leaderboard = require('./game/leaderBoard.js')

//Connexion à la base de donnée
var ERROR_DB = false;
const db_url = process.env.DB_SERVICE + "://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_CNT_NAME + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME;
console.log(db_url);
//retry to connect every minutes if failure
setInterval(function() {
	mongoose
		.connect(db_url, { useNewUrlParser: true , useUnifiedTopology: true })
		.then(() => {
			console.log("Connected to mongoDB");
			ERROR_DB = false;
			clearInterval(this);
		})
		.catch((e) => {
			console.log("Error while DB connecting");
			ERROR_DB = true;
	});	}, 1000 * 60//1minutes
);


//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
	extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
//middlewarre for database error
app.use((req, res, next)=> {
	if (req.method != 'OPTIONS' && ERROR_DB)
		return res.status(503).json({error_msg: "error when connecting to the database"});
	else
		next();
})
//Définition du routeur
const router = express.Router();

//mount router on app
app.use("", router);
require(__dirname + "/controllers/userController")(router);

app.use(function(req, res){
	res.status(404);
	// respond with json
	if (req.accepts('json')) {
	res.send({ error: 'Not found' });
	return;
	}
})
//Définition et mise en place du port d'écoute
const port = process.env.NODE_PORT || 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));

//set routine for leaderboard update
setInterval(function() {
	leaderboard.compute();
}, 1000 * 60 * 5//5minutes
);
