const account = require('./account/account.js');
const userInfo = require('./account/loggedInfo.js');
const token = require('./account/token.js');
module.exports = function (app) {
    /*
    C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api / 
    */
    app.post('/login', account.login);
    app.post('/signup', account.signup);
    app.put('/result', userInfo.result);
    app.put('/updateToken', token.updateToken);
    app.get('/isAuth', token.isAuth);
    app.get('/info', userInfo.getInfo);
    app.get('/scores', userInfo.getScores);
}