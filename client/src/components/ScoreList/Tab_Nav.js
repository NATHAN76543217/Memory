import React from 'react';
import "./ScoreList.css"

class TabNav extends React.Component {

  render() {
	return (
		<div>
			<ul>
			{
				this.props.tabs.map(tab => {
					const active = (tab === this.props.selected ? 'active' : '' );
					return (
						<li key={ active==='active' ? + 1 : + 0 } className={active} onClick={() => this.props.setSelected(tab)}>
								{ tab }
						</li>);
				})
			}
			</ul>
			{ this.props.children }
		</div>
	);
  }
}
export default TabNav;