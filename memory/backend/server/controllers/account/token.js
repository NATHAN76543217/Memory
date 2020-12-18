const info = require("./loggedInfo");
const jwt = require("jwt-simple");
const config = require("../../config/config");

function force_logout(req, res)
{
	console.log("LOG OUT");
	return res.status(408).json({
		"isAuth": false,
		text: "token expired",
	});
}

function token_valid(token)
{
	if (token == null)
		return false;
	const {expire} = jwt.decode(token, config.secret);
	if (Date.now() >= expire)
		return false;
	return true;

}
function isAuth(req, res)
{
	console.log("ISAUTH?");
	const {token} = req.query;
	if (token_valid(token) === false)
		return force_logout(req, res);
	return res.status(200).json({"isAuth":true});
}
function updateToken(req, res)
{
    console.log("UPDATE TOKEN")
	try
	{
        const {token} = req.body;
        const query = info.getUQueryfromToken(token);
		if (query === null)
            return force_logout(req, res);
        query.exec((err, user)=> {
            if (err) throw err;
            const newToken = user.genToken();
            if (token_valid(newToken) === false)
                return force_logout(req, res);
            return res.status(200).json({token: newToken});
        });
    }
	catch (error) {
        console.error(error)
        res.status(500).json({"function":"updateToken", "error":error})}
}
exports.updateToken = updateToken;
exports.isAuth = isAuth;
exports.is_valid = token_valid;
exports.force_logout = force_logout;