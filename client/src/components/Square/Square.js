import Grid from '@material-ui/core/Grid';
import './Square.css'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

function Square ({fruit, onClick})
{
	return (
		<Grid item xs={2}>
			<Card className="card" onClick={onClick}>
			{fruit.visible ? <CardMedia component="img" image={fruit.img}/> : <CardMedia component="img" image={fruit.hidden}/>} 
			</Card>
		</Grid>);
}
export default Square;
