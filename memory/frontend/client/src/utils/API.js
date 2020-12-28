import axios from "axios";

//TODO reduire le nombre d'appel à isAuth et fixer le promise not handled + check if server.logout destroy token and if isAuth send anything if token dont exist 
const headers = {
	"Content-Type": "application/json"
};
const burl = "http://localhost:8800";

function login(name, password) {
	return axios.post(`${burl}/login`, { name, password }, { headers : headers });
}
function signup(send) {
	return axios.post(`${burl}/signup`, send, { headers: headers });
}

function isAuth() {
	const token = getToken();
	if (token == null)
		return false;
	const res = axios.get(`${burl}/isAuth`, {headers:headers, params:{token:token}})
	.then((res) => {return res.data.isAuth})
	.catch(error => {
		if (error.response && error.response.status === 408)
		{
			console.log("Token expired");
			logout();
			return false
		}
	});;
	console.log("IsAuth: " + res);
	return res;
}
function logout() {
	localStorage.clear();
	window.location = "/";
}
function getToken() {
	const tk = localStorage.getItem("token");
	return tk;
}
function updateToken()
{
	console.log("UPDATE TOKEN");
	const update = axios.put(`${burl}/updateToken`, {token:getToken()}, {headers:headers})
	.then((res)=> {
		console.log(res);
		localStorage.setItem("token", res.data.token);
	})
	.catch(error=> {
		if (error.response && error.response.status === 408)
		{
			console.log("Token expired");
			logout();
		}		
	});
	return update;
}
function getUserInfo() {
	if (this.isAuth){
		let token = this.getToken();
		return axios.get(`${burl}/info`, {headers: headers, params: {token : token} }).catch(error => {
			if (error.response && error.response.status === 408)
			{
				console.log("Token expired");
				logout();
			}
		});
	}
	return null;
}
function looseTheGame()
{
	return axios.post(`${burl}/loose`, {}, {headers: headers});
}

function sendScore(nb_card, result, time_elapsed)
{
	localStorage.setItem("last", result);
	console.log("set result to:" + result);
	window.location = "/endgame"
	return axios.put(`${burl}/result`, {token: this.getToken(), result: result, score: time_elapsed, nb_card: nb_card}, {headers: headers}).catch(error => console.error(error))
}
function getScores(scope, nb_card)
{
	if (this.isAuth){
		const token = this.getToken();
		return axios.get(`${burl}/scores`, {headers: headers, params: {token: token, nb_card: nb_card}})
			.then((res) => {return res.data.scores})
			.catch(err => {
				if (err.response && err.response.status === 500)
					return null
				else
					console.error(err);
			});
	}
}


const API = {
	signup,
	login,
	logout,
	isAuth,
	getToken,
	updateToken,
	getUserInfo,
	looseTheGame,
	sendScore,
	getScores
}
export default API;