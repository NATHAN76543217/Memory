import React from 'react';
import "./ScoreList.css"

function Tab({isSelected, children})
{
  if (isSelected) {
    return (
      <div>
        {children}
      </div>
    );
  }
  return null;
}
export default Tab;