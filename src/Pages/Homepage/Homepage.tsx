import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { CatBrowserContext } from '../../Context/CatBrowserProvider'
import './Homepage.css'

interface CatBreeds {
	name: string
	id: string
}

const Homepage = () => {
	const { setBreeds } = useContext(CatBrowserContext)
	const [catBreeds, setCatBreeds] = useState<CatBreeds[]>([])
	const [selectedCat, setSelectedCat] = useState('')

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
					console.log('data', data)
					const { data: breedArr } = data
					const breedName = breedArr.map((breed: { name: string; id: string }) => {
						return {
							name: breed.name,
							id: breed.id,
						}
					})
					console.log('breedName', breedName)
					setCatBreeds(breedName)
					setBreeds(breedName)
				})
				.catch((err) => {
					console.error('error', err)
				})
		}
	}, [setBreeds, catBreeds])

	const handleCatChange = (e: any) => {
		console.log(e.target.value)
		setSelectedCat(e.target.value)
	}

	return (
		<Form>
			<Form.Group controlId='catSelect'>
				<Form.Label>Select a cat breed:</Form.Label>
				<Form.Control as='select' value={selectedCat} onChange={handleCatChange}>
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
	)
}

export default Homepage
