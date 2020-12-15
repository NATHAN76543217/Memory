# Memory
    First projet React/Node.js
    A memory game.

## Available Scripts
    In the project directory, you can run:
### `npm start`

    start client and server app.
    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

    The page will reload if you make edits.\
    You will also see any lint errors in the console.

### `npm run build`

    Builds the app for production to the `build` folder.\
    It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.\
    Your app is ready to be deployed!

    See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

    **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

    If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

    Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

    You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Package.json
    Contient les informations relatives au dépendances d'un projet nodeJS ainsi que sa description et peut aussi contenir quelques alias de scripts.
    Télécharger et installer les dépendences avec `npm install`
### controllers
    Contient les controllers pour Express.
### Schema
    Contient les schémas pour mongoDB.
### Config
    Contient les fichiers de config
### Client
    Contient la partie front-end React du projet.

## Frameworks
### Create React App
    Permet de faciliter la mise en place d'application ReactJS ainsi que de tester les modification en temps réel sans avoir à relancer manuellement le serveur client.
### `nodemon`
    Permet de tester les modification du serveur en temps réel sans avoir à le relancer manuellement.
### `express`
    Express est un framework aidant à gérer les routes et les middlewares de notre serveur ainsi que les requetes AJAX.
### `Axios`
    Promise based HTTP client for the browser and node.js
    Recuperer data from:
    GET: req.query
    PUT/POST: req.body
### `Body-parser`
    Body-parser permet de récupérer facilement les données envoyées sur nos routes notamment lors de l’envoi d’un formulaire.
### `MongoDB`
    MongoDB est une database NoSQL permettant de gérer une grande quantité de donnée facilement.
### `Mongoose`
    Mongoose est un module facilitant les interactions entre le serveur et la BDD MongoDB.
### `Password-hash`
    Password-hash est un module permettant de hasher facilement des mots passes (et éviter d’écrire un mot de passe en clair dans la base de donnée : RGPD Attention !!).
### `JWT-simple`
    JWT-simple permet de générer des JSON Web Tokens (JWT) qui permettent par exemple d’authentifier un utilisateur lors d’une requête grâce à un système d’échange de jetons et de vérification d’identité 

