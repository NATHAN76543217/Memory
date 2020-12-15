//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const leaderboard = require('./game/leaderBoard.js')
//Connexion à la base de donnée
mongoose
	.connect("mongodb://localhost/db", { useNewUrlParser: true , useUnifiedTopology: true })
	.then(() => {
	console.log("Connected to mongoDB");
	})
	.catch((e) => {
	console.log("Error while DB connecting");
	console.log(e);
	});

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

//Définition du routeur
const router = express.Router();
router.use(function timeLog (req, res, next) {
	//console.log('Time: ', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
	next()
})
router.use('/user/:id', function (req, res, next) {
	console.log('Request URL:', req.originalUrl)
	next()
}, function (req, res, next) {
	console.log('Request Type:', req.method)
	next()
})

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
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));

//set routine for leaderboard update
setInterval(function() {
	leaderboard.compute();
}, 1000 * 60 * 5//5minutes
);
