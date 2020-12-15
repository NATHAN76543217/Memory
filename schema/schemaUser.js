const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		victories: {
			type: Number,
			default: 0
		},
		defeats: {
			type: Number,
			default: 0
		},
		scores: {}
	},
	{ timestamps: { createdAt: "created_at" } }

);

userSchema.methods = {
	authenticate: function(password) {
		return passwordHash.verify(password, this.password);
	},
	genToken: function() {
		return jwt.encode({
			id: this._id,
			expire: Date.now() + (1000 * 60 * 15) //15 minutes
		}, config.secret);
	},
	getBestScores: function(nb_card) {
	if (this.scores == null || this.scores[nb_card.toString()] == null)
		return null;
		let scores = this.scores[nb_card.toString()];
		console.log("BEST SCORES:");
		console.log(scores);
		if (scores == null)
			return null;
		return scores.slice(0, 10);
	},
	getName: () =>{return this.name},

	addScore: function(score, nb_card) {
		console.log("ADD SCORE");
		if (this.scores == null || Object.keys(this.scores).length ===  0)
		{
			this.scores = {[nb_card.toString()]: [score,]};
			console.log(this.scores[nb_card.toString()]);
		}
		else if (this.scores[nb_card.toString()] == null)
		{
			this.scores[nb_card.toString()] = [score, ];
		}
		else
		{
			this.scores[nb_card.toString()].push(score);
			this.scores[nb_card.toString()].sort((a, b) => {
				return parseInt(a) - parseInt(b)} );
		}
		this.markModified("scores");
	}
};

module.exports = mongoose.model("User", userSchema);