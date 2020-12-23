const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
	const { password, name } = req.body;
	console.log("GET SIGNIN");
	if (!name || !password) {
		//Le cas où l'email ou bien le password ne serait pas soumit ou nul
		return res.status(400).json({
			text: "Nom/Password non transmis"
		});
	}
	// Création d'un objet user, dans lequel on hash le mot de passe
	const user = {
		name,
		password: passwordHash.generate(password)
	};
	// On check en base si l'utilisateur existe déjà
	try {
		const findUser = await User.findOne( {name} );
		if (findUser) {
			return res.status(400).json({
				text: "L'utilisateur existe déjà"
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
	try {
		// Sauvegarde de l'utilisateur en base
		const userData = new User(user);
		const userObject = await userData.save();
		return res.status(200).json({
			text: "Succès",
			token: userObject.genToken()
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({error: error, text:"save user data"});
	}
}

async function login(req, res) {
		const { password, name } = req.body;
		var findUser = null;
		if (!name || !password) { //Le cas où l'email ou bien le password ne serait pas soumit ou nul
			return res.status(400).json({
				text: "Requête invalide"
			});
		}
		try {
			// On check si l'utilisateur existe en base
			findUser = await User.findOne({ name })
			if (!findUser)
				return res.status(401).json({
					text: "L'utilisateur n'existe pas"
				});
			else if (!findUser.authenticate(password))
				return res.status(401).json({
					text: "Mot de passe incorrect"
				});
			return res.status(200).json({
				token: findUser.genToken(),
				text: "Authentification réussi"
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				error:error.msg
			});
		}
	}

//On exporte nos deux fonctions
exports.login = login;
exports.signup = signup;