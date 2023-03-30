import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { CatBrowserContext } from '../../Context/CatBrowserProvider'
import './Homepage.css'
import Results from './Results/Results'

interface CatBreeds {
	name: string
	id: string
}

const Homepage = () => {
	const { setBreeds, selectedBreed, setSelectedBreed, setLimit } = useContext(CatBrowserContext)
	const [catBreeds, setCatBreeds] = useState<CatBreeds[]>([])
	const [error, setError] = useState(false)

	useEffect(() => {
		if (catBreeds.length === 0) {
			//Calls api with x-api-key from https://developers.thecatapi.com/
			axios
				.get(`${process.env.REACT_APP_API_URL}breeds`, {
					headers: {
						'x-api-key': process.env.REACT_APP_CAT_API_KEY,
					},
				})
				.then((data) => {
					const { data: breedArr } = data
					const breedName = breedArr.map((breed: { name: string; id: string }) => {
						return {
							name: breed.name,
							id: breed.id,
						}
					})
					setCatBreeds(breedName)
					setBreeds(breedName)
				})
				.catch((err) => {
					setError(true)
				})
		}
	}, [setBreeds, catBreeds])

	const handleCatChange = (e: any) => {
		setSelectedBreed(e.target.value)
		//Resets limit to default
		setLimit(4)
	}

	return (
		<Fragment>
			{error && (
				<Alert className='mb-5' variant='danger'>
					Something went wrong
				</Alert>
			)}
			<Form>
				<Form.Group controlId='catSelect'>
					<Form.Label>Select a cat breed:</Form.Label>
					<Form.Control as='select' value={selectedBreed} onChange={handleCatChange}>
						<option value=''>- Select -</option>
						{catBreeds.map((catBreed) => {
							return (
								<option key={catBreed.id} value={catBreed.id}>
									{catBreed.name}
								</option>
							)
						})}
					</Form.Control>
				</Form.Group>
			</Form>
			<Results />
		</Fragment>
	)
}

export default Homepage
