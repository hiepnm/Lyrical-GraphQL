import React, { Component } from 'react';

class LyricList extends Component {
	render() {
		const { lyrics } = this.props;
		if (lyrics.length === 0) {
			return <div></div>
		};
		return (
			<ul className="collection" style={{maxWidth: 600}}>
				{
					lyrics.map(
						lyric => {
							return (
								<li key={lyric.id} className="collection-item" style={{display: 'flex', justifyContent: 'space-between', maxWidth: 600}}>
									{lyric.content}
									<a 
										style={{cursor: 'pointer', textDecoration: 'none', color: '#000'}}
										onClick={
											e => {
												e.preventDefault();
												console.log('like on:', lyric.id)
											}
										}
									>
										<i className="material-icons">favorite</i>
									</a>
								</li>
							)
						}
					)
				}
			</ul>
		);
	}
}

export default LyricList;
