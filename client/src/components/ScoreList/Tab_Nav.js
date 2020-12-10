import React from 'react';
import "./ScoreList.css"

class TabNav extends React.Component {

  render() {
	return (
		<div>
			<ul>
			{
				this.props.tabs.map(tab => {
					const active = (tab === this.props.selected ? 'active ' : '' );
					return (
						<li key={ tab } className={active}>
							<a onClick={ () => this.props.setSelected(tab) }>
								{ tab }
							</a>
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