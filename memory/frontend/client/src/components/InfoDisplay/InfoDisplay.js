import "./InfoDisplay.css"

function InfoDisplay({user, game})
{
    return (
        <div className="info">
        <h2>
            {user.name}<br/>
        </h2>
        <p>
            Victories:&ensp;{user.victories}<br/>
            Defeats:&emsp;{user.defeats}
        </p>
        <p>
            Pairs left:&ensp;{game.pair_left}<br/>
            time left:&ensp;{game.time_left} seconds<br/>
        </p>
    </div>
);}
export default InfoDisplay;
