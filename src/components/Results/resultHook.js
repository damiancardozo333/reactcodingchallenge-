import { useState, useEffect } from "react";

export default function useFetch(url) {
	const [data, setData] = useState([]);

	async function getData() {
		fetch(url)
			.then(result => {
				return result.json();
			})
			.then(data => {
				setData(data.results);
			});
	}

	useEffect(() => {
		getData();
	}, []);

	return data;
}
