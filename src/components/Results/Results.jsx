import React, { useState, useEffect } from "react";
import { Card, Button, CardColumns } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import useFetch from "./resultHook";

export default function Results(props) {
	const [rating, setRating] = useState(5);
	const data = useFetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&sort_by=popularity.desc`
	);

	const changeRating = nextValue => {
		nextValue == rating ? setRating(0) : setRating(nextValue);
	};

	return (
		<>
			<StarRatings
				rating={rating}
				starRatedColor='blue'
				changeRating={changeRating}
				numberOfStars={5}
				name='rating'
			/>
			<CardColumns>
				{props && props.movies.length
					? props.movies.map((movie, index) =>
							movie.vote_average >= rating * 2 - 2 ? (
								<Card
									onCLikc={() => {
										props.setMovieId(movie.id);
									}}
									key={index}>
									<Card.Img
										variant='top'
										src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
									/>
									<Card.Body>
										<Card.Title>{movie.original_title}</Card.Title>
									</Card.Body>
								</Card>
							) : (
								""
							)
					  )
					: data.length
					? data.map((movie, index) =>
							movie.vote_average >= rating * 2 - 2 ? (
								<Card
									onClick={() => {
										props.setMovieId(movie.id);
									}}
									key={index}>
									<Card.Img
										variant='top'
										src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
									/>
									<Card.Body>
										<Card.Title>{movie.original_title}</Card.Title>
									</Card.Body>
								</Card>
							) : (
								""
							)
					  )
					: ""}
			</CardColumns>
		</>
	);
}
