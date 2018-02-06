import React, { Component } from 'react';
import query from '../queries/fetchSongs';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
	onSongDelete(id) {
		this.props.mutate({variables: {id}})
		.then(
			() => this.props.data.refetch()
		)
	}
	renderSongs() {
		return this.props.data.songs.map(
			({id, title}) => {
				return (
					<li key={id} className="collection-item" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
						<Link to={`/song/${id}`}>{title}</Link>
						<a 
							style={{cursor: 'pointer', textDecoration: 'none', color: '#000'}}
							onClick={() => this.onSongDelete(id)}
						>
							<i className="material-icons">delete</i>
						</a>
						
					</li>
				)
			}
		);
	}
	render() {
		if(this.props.data.loading) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<ul className="collection">
					{this.renderSongs()}
				</ul>
				<Link
					to="/song/new"
					className="btn-floating btn-large red right"
				>
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;

export default graphql(mutation)(graphql(query)(SongList));