import React, { useState, useEffect } from "react";

export const MovieView = () => {
	const [movieTitle, setMovieTitle] = useState([]);
	const [movieValue, setMovieValue] = useState({});
	const [count, setCount] = useState(0);

	useEffect(() => {
		setCount(movieValue?.Search?.length);
	}, [movieValue]);

	const apiUrl = `http://www.omdbapi.com/?s=${movieTitle}&apikey=b684b3e`;

	const getMovie = async () => {
		const response = await fetch(apiUrl);
		const data = await response.json();
		setMovieValue(data);
		console.log(data);
	};

	const handleSubmit = (e) => {
		try {
			getMovie();
			setMovieTitle("");
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		console.log(e.target.value);
		setMovieTitle(e.target.value);
	};

	return (
		<>
			<form>
				<label>
					Search For a Movie Title
					<input
						type="text"
						placeholder="Enter Movie title"
						value={movieTitle}
						onChange={handleChange}
					/>
				</label>
				<button type="button" onClick={handleSubmit}>
					Search Movie Title
				</button>
				<p>Number of movies returned: {count} </p>
			</form>
			{movieValue?.Search?.map((moviesTitles) => {
				return (
					<div key={moviesTitles.imdbID}>
						<p>{moviesTitles.Title}</p>
						<img src={moviesTitles.Poster}></img>
					</div>
				);
			})}
		</>
	);
};
