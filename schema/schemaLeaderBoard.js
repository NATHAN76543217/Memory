const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderBoardSchema = mongoose.Schema(
{
    name:{
        type:String,
        require: false
    },
    scores:{
        type: Schema.Types.Mixed,
        require: true
    }
},
    { timestamps: { createdAt: "created_at" } }
);

leaderBoardSchema.methods = {
        authenticate: function(password) {
            return passwordHash.verify(password, this.password);
        },
        getScores: function(nb_card){
            if (this.scores[nb_card] == null)
                return null;
            return this.scores[nb_card];
        }
};

module.exports = mongoose.model("LeaderBoard", leaderBoardSchema);