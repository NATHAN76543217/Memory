import React from 'react';
import {LinearProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const Timer = withStyles(() => ({
	root: {
	  height: 20,
	  marginTop: 30,
	  borderRadius: 8,
		Width: 1,
	},
	bar: {
	  backgroundColor: '#11c9d0',
	  transition: "1s ease",
	},
}))(LinearProgress);

function ProgressBar({variant, value}){
  const [progress, setProgress] = React.useState(100);
  value !== progress && setProgress(value)
    
    
    return(
      <Timer variant={variant} value={progress} />
    );

};

export default ProgressBar;