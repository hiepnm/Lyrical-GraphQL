import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
						({id, content, likes}) => {
							return (
								<li key={id} className="collection-item" style={{display: 'flex', justifyContent: 'space-between', maxWidth: 600}}>
									{content}
									<div style={{display: 'flex', alignItems: 'center'}}>
										<a 
											style={{cursor: 'pointer', textDecoration: 'none', color: '#000', marginRight: 5}}
											onClick={
												e => {
													e.preventDefault();
													this.props.mutate({
														variables: {id},
														optimisticResponse: {
															__typename: 'Mutation',
															likeLyric: {
																id: id,
																__typename: 'LikeLyric',
																likes: likes+1
															}
														}
													})
												}
											}
										>
											<i className="material-icons">thumb_up</i>
										</a>
										{likes}
									</div>
								</li>
							)
						}
					)
				}
			</ul>
		);
	}
}
const mutation = gql`
	mutation LikeLyric($id:ID!) {
		likeLyric(id: $id) {
			id
			likes
		}
	}
`;
export default graphql(mutation)(LyricList);
