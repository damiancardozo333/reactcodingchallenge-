import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Header(props) {
	const { register, handleSubmit } = useForm();
	const onSubmit = query => {
		props.search(query);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputGroup className='mb-3'>
					<InputGroup.Prepend>
						<Button variant='outline-secondary' type='submit'>
							Button
						</Button>
					</InputGroup.Prepend>
					<FormControl
						defaultValue='search'
						name='searchQuery'
						ref={register}
					/>
				</InputGroup>
			</form>
		</>
	);
}
