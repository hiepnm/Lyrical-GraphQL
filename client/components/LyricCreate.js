import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSong';

class LyricCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChangeLyric = this.handleChangeLyric.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const { content } = this.state;
		const { songId } = this.props;
		this.props.mutate({
			variables: { 
				content,
				songId,
			},
			refetchQueries: [{query, variables: {id: songId}}]
		})
		.then(
			() => this.setState({content: ''})
		)
	}

	handleChangeLyric(e) {
		e.preventDefault();
		this.setState({
			content: e.target.value,
		})
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<label>Add a Lyric</label>
				<input 
					value={this.state.content}
					onChange={this.handleChangeLyric}
				/>
			</form>
		)
	}
}

const mutation = gql`
	mutation AddLyricToSong($content: String, $songId:ID) {
		addLyricToSong(content: $content, songId: $songId) {
			id, title, lyrics {
				id
			}
		}
	}
`;

export default graphql(mutation)(LyricCreate);
