import "./InfoDisplay.css"

function InfoDisplay({user, game})
{
    return (
        <div className="info">
        <h2>
            {user.name}<br/>
        </h2>
        <p>
            Victories: {user.victories}<br/>
            Defeats: {user.defeats}
        </p>
        <p>
            Pairs left: {game.pair_left}<br/>
        </p>
    </div>
);}
export default InfoDisplay;
