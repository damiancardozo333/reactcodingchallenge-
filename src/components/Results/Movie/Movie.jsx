import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

export default function Movie(props) {
	const [movie, setMovie] = useState({});
	const getUrl = "https://api.themoviedb.org/3/movie/";
	async function getMovie() {
		props && props.movieId
			? fetch(`
${getUrl}${props.movieId}?api_key=${props.apiKey}&language=en-US`)
					.then(result => {
						return result.json();
					})
					.then(data => {
						setMovie(data);
					})
			: console.log("missing data for call ");
	}
	useEffect(() => {
		getMovie();
	}, [props.movieId]);
	return (
		<>
			<Card>
				<Card.Img
					variant='top'
					src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
				/>
				<Card.Body>
					<Card.Title>{movie.original_title}</Card.Title>
					<Card.Text>{movie.overview}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}
