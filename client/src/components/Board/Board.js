import Square from '../Square/Square.js'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

function DispCase({fruit, onClick})
{
	return (
		<Square key={fruit.k} fruit={fruit} onClick={() => onClick(fruit)}/> 
	);
}

function FormRow({start, row_size, donne, onClick}) {

    var row = [];
    for (let i = start; i < start + row_size; i++)
    {
	  row.push(<DispCase key={i} fruit={donne[i]} onClick={onClick} />)
    }
	return (
		<Grid container item xs="auto" spacing={2} direction='row'>
		    {row}
		</Grid>
	);
}
FormRow.defaultProps = {

}
FormRow.propTypes = {
	start: PropTypes.number,
}

function Board({donne, onClick})
{ 

//--------------------------
	const col_size = Math.ceil(Math.sqrt(donne.length));
	const line_size = Math.round(Math.sqrt(donne.length));
	const grid = [];
	let i = 0;

	for (; i < col_size - 1; i++)//0 1
	{
		grid.push(<FormRow key={i} donne={donne} start={i * line_size} row_size={line_size} onClick={onClick}/>);
	}
	console.log("-start: " + (i * line_size) + " size: " + (line_size * i));
	grid.push(<FormRow key={i} donne={donne} start={i * line_size} row_size={donne.length - (i * line_size)} onClick={onClick}/> )
	return (
			<Grid container item xs="auto" spacing={1} direction='column'>
				{grid}
			</Grid>
        );
}

export default Board;