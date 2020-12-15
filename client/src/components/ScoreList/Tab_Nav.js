import React from 'react';
import "./ScoreList.css"

function TabNav(props){
	return (
		<div>
			<ul>
			{
				props.tabs.map(tab => {
					const active = (tab === props.selected ? 'active' : '' );
					return (
						<li key={ active==='active' ? + 1 : + 0 } className={active} onClick={() => props.setSelected(tab)}>
								{ tab }
						</li>);
				})
			}
			</ul>
			{ props.children }
		</div>
	);
}
export default TabNav;