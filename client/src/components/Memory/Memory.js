import './Memory.css';
import Board from '../Board/Board.js'
import InfoDisplay from "../InfoDisplay/InfoDisplay.js"
import React from 'react';
import img_loader from './images/images'
import ProgressBar from "../ProgressBar/ProgressBar.js"
import API from "../../utils/API.js"
//mélange de facon aléatoire le tableau passé en entrée
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }
//TODO  Add Start timer on first click
//TODO passer data par bouton retry
//TODO a chaque de debut de partie re crée un token
//TODO ajouter redirection d'user si arrive sur page log ou signin vers le menu
//TODO add time elapsed to end page
class Memory extends React.Component
{
	constructor(props)
	{
		super(props);
		this.name = "Memory";
		this.load_cards = this.load_cards.bind(this);
		this.state = {
			card_list: [],
			nb_pair: this.props.location.data,
			pair_left: -1,
			locked: false,
			flipped: [],
			percent: 1,
			time_left: 0,
			total_time: 0,
			timer: null,
			timeout: false,
			user: {},
		};
		this.startTimer = this.startTimer.bind(this);
		this.countDown = this.countDown.bind(this);
		this.clickOnCard.bind(this);
		this.close_cards = this.close_cards.bind(this);
	}
	async componentDidMount()
	{
		const res = await API.getUserInfo();
		res && this.setState({user: res.data})
		this.startGame();
	}
	//Game state
	startGame()
	{
		if (localStorage.getItem("running") === "true")
		{
			console.log("RESTORE GAME");
			if (this.restoreGame() === -1)
			{
				console.log("RESTORE NOT FOUND");
				localStorage.setItem("running", false);
				this.startGame();
			}
			return;
		}
		console.log("START GAME");
		const total_time = this.state.nb_pair * 7;
		this.setState({
			timeout: false,
			card_list: this.load_cards(this.state.nb_pair),
			time_left: total_time,
			total_time: total_time,
			percent: 1,
		}, ()=>{this.setState({
			pair_left: this.state.card_list.length / 2,

		})});
		localStorage.setItem("running", "true");
		API.updateToken();
	}
	restoreList()
	{
		//liste de l'ordre des key
		const order_list = localStorage.getItem("card_list_order");
		console.log("orderlist:");
		console.log(order_list);
		//liste des key a rendre visible
		const visible_list = localStorage.getItem("card_list_visible").split(",");
		const nb_pair = parseInt(localStorage.getItem("nb_pair"));
		//liste des
		console.log("RESTORE V:" + visible_list);
		const load_list = this.load_cards(nb_pair);
		var card_list = [];
		order_list.split(",").forEach((key) => {
			console.log("key = " + key)
			const ndx = load_list.findIndex((f) => f.k === parseInt(key));
			if (visible_list.indexOf(key) > -1)
				load_list[ndx].visible = true;
			card_list.push(load_list[ndx]);
		})
		console.log("Load list::");
		console.log(card_list);
		return card_list;
	}
	restoreGame()
	{
		//restaure la partie au dernier état enregistré en cas de refresh de la page
		//verifier l'état des variable du stockage local
		const nb_pair_left = parseInt(localStorage.getItem("pair_left"));
		const nb_pair = parseInt(localStorage.getItem("nb_pair"));
		const time_left = parseInt(localStorage.getItem("time_left"));
		if (nb_pair_left == null || nb_pair_left === 0 || time_left == null || time_left === 0)
			return -1;
		const listSet = this.restoreList();
		const total_time = nb_pair * 10;
		this.setState({
			card_list: listSet,
			pair_left: (nb_pair_left),
			nb_pair: (nb_pair),
			percent: time_left / total_time,
			timeout: false,
			time_left: time_left,
			total_time: total_time,
		});
		return;
	}
	endGame()
	{
		//fin du jeu redi
		localStorage.removeItem("running");
		const result = (this.state.pair_left === 0 ? "win" : "loose" );
		const time_elapsed = this.state.total_time - this.state.time_left;
		API.sendScore(this.state.nb_pair, result, time_elapsed);
		return null;
	}

	//Jeu
	test_match(flip)
	{
		if (this.getFruit(flip[0]).id === this.getFruit(flip[1]).id)
		{
			console.log("Match!");
			return true;
		}
		console.log("No__ match");
		return false;
		
	}
	updateFruit(fruit)
	{
		//récup une copie de liste de fruit
		const lst = [...this.state.card_list];
		//récupere l'index du fruit à changer
		const ndx = this.getFruitIndex((f) => f.k === fruit.k);
		//met a jour le fruit dans la liste
		lst[ndx] = fruit;
		//update state
		this.setState({card_list: lst})
	}

	getFruitIndex(ft)
	{
		return this.state.card_list.findIndex(ft);
	}
	getFruit(ndx)
	{
		return this.state.card_list[ndx];
	}
	close_cards(flip, timer)
	{
		console.log("gF" + this);
		//cache les cartes visibles
		flip.forEach((ndx)=> {
			console.log("hide ndx:" + ndx);
			const fruit = this.getFruit(ndx);
			fruit.visible = false;
			this.updateFruit(fruit);
		});
		this.setState({flipped: [], locked: false});
		clearTimeout(timer);
	}

	match()
	{
		// reset
		this.setState({
			pair_left: this.state.pair_left - 1,
			flipped: []});
	}
	clickOnCard(fruit)
	{
		//if first click
		if (this.state.timer === null)
			this.startTimer();
		const flip = [...this.state.flipped];
		if (fruit.visible || this.state.locked)
			return;
		console.log("set visible: key=" + fruit.k + " et id=" + fruit.id);
		//set fruit visible
		fruit.visible = true;
		this.updateFruit(fruit);
		//save flipped card
		flip.push(this.getFruitIndex((f) => f.k === fruit.k));
		//if pair is flipped
		if (flip.length === 2)
		{
			if (this.test_match(flip) === true)
			{
				this.match();
			}
			else
			{
				//set timer for keeping cards visible before hidding
				this.setState({locked: true});
				var timer = setTimeout(this.close_cards, 500, flip, timer);
			}
		}
		else
			this.setState({flipped: flip});

		console.log("quit click");
	}

	load_cards(nb_pair_to_load)
	{
		console.log("Nb pair receive:" + nb_pair_to_load);
		const fruits = img_loader(nb_pair_to_load);
		console.log("Nb fruit Loaded:" + fruits.length);
		let dup = [];
		//fill dup with a copy a fruits
		fruits.forEach(f => 
			dup.push({...f}));
		//set l'id pour chaque fruit
		dup.forEach(elem => elem.k = elem.id + dup.length);
		//cards == fruits + dup
		const cards = [...fruits, ...dup];
		console.log("set a donne of " + cards.length + " cards");
		console.log(cards);
		return shuffle(cards);
	}
//Timer
	startTimer() {
		  this.setState({timer:  setInterval(this.countDown, 1000)}, () => {
			console.log("START TIMER: " + this.state.timer);
		  });
		}
	countDown() {
		// Remove one second, set state so a re-render happens.
		let seconds_left = this.state.time_left - 1;
		seconds_left % 10 === 0 && console.log("-timeleft:" + seconds_left)	
		this.setState({
		  time_left: seconds_left,
		  percent: this.state.time_left / this.state.total_time,
		});
		// Check if we're at zero.
		if (seconds_left === 0) {
			console.log("TIME'S UP !!!!!");
			this.setState({timeout: true});
			clearInterval(this.state.timer);
		}
	  }
	saveState()
	{
		const card_list = this.state.card_list;
		let visible = [];
		let card_order = [];
		card_list.map((card)=>{
			card_order.push(card.k);
			if (card.visible === true && this.state.flipped.includes(this.getFruitIndex((f) => f.k === card.k)) === false)
			{
				visible.push(card.k);
			}
			return 0;
		});
		//console.log("STORE V:" + visible);
		localStorage.setItem("card_list_visible", visible);
		localStorage.setItem("card_list_order", card_order);
		localStorage.setItem("nb_pair", this.state.nb_pair);
		localStorage.setItem("pair_left", this.state.pair_left.toString());
		localStorage.setItem("time_left", this.state.time_left.toString());
	}
	render(){
		if (this.state.card_list.lenght !== 0 && this.state.pair_left !== -1)
			this.saveState();
		if (this.state.pair_left === 0 || this.state.timeout === true)
			return this.endGame();
		else
			return (
					<div className="game_field">
						<div className="board">
	    		    		<Board donne={this.state.card_list} onClick={(fruit) => this.clickOnCard(fruit)}/>
							<ProgressBar variant="determinate" value={this.state.percent * 100}/>
						</div>

						<InfoDisplay user={this.state.user} game={this.state}/>
				    </div>		
				)};

}
//<Button onClick={() => this.setState({pair_left: 0})} >WIN GAME</Button>
//<Button onClick={() => this.setState({time_left: 1})} >LOOSE GAME</Button>

export default Memory;