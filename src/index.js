import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";
import Results from "./components/Results/Results";
import Header from "./components/Header/Header";
import Movie from "./components/Results/Movie/Movie";
Modal.setAppElement("body");

function App() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [movieId, setMovieId] = useState(0);

	const apiKey = "621b91c5714871f62f694371181816fc";

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const handleMovieIdChange = id => {
		setMovieId(id);
		openModal();
	};

	async function getData() {
		const searchUrl = "https://api.themoviedb.org/3/search/movie";
		query && query.searchQuery
			? fetch(`
${searchUrl}?api_key=${apiKey}&language=en-US&query=${query.searchQuery}`)
					.then(result => {
						return result.json();
					})
					.then(data => {
						setMovies(data.results);
					})
			: console.log("missing query param");
	}

	useEffect(() => {
		getData();
	}, [query]);

	const search = query => {
		setQuery(query);
	};

	return (
		<div>
			<Header search={search} />
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel='Example Modal'>
				<button onClick={closeModal}>close</button>
				<div>Details</div>
				<Movie movieId={movieId} apiKey={apiKey} />
			</Modal>
			<Results
				movies={movies}
				openModal={openModal}
				setMovieId={handleMovieIdChange}
				apiKey={apiKey}
			/>
		</div>
	);
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
