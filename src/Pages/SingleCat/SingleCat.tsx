import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ImageLoader from '../../Common/ImageLoader'
import './SingleCat.css'

interface ICatDetails {
	breedName: string
	origin: string
	temperament: string
	description: string
	url: string
}

const SingleCat = () => {
	const params = useParams()
	const [catDetails, setCatDetails] = useState<ICatDetails>({
		breedName: '',
		origin: '',
		temperament: '',
		description: '',
		url: '',
	})
	const navigate = useNavigate()
	const { id } = params

	useEffect(() => {
		if (id) {
			axios
				.get(`${process.env.REACT_APP_API_URL}images/${id}`, {
					headers: {
						'x-api-key': process.env.REACT_APP_CAT_API_KEY,
					},
				})
				.then((data: any) => {
					const details = data.data.breeds[0]
					setCatDetails({
						url: data.data.url,
						origin: details.origin,
						breedName: details.name,
						temperament: details.temperament,
						description: details.description,
					})
				})
				.catch((err: any) => {
					console.error('error', err)
					//setError(true)
				})
		}
	}, [id])

	const handleClick = () => {
		navigate('/')
	}

	return (
		<Fragment>
			{catDetails && (
				<Row>
					<Col className='mt-5'>
						<Card>
							<ImageLoader src={catDetails.url} />
							<Card.Body>
								<Card.Title>{catDetails.breedName}</Card.Title>
								<Card.Subtitle className='mb-2'>{catDetails.temperament}</Card.Subtitle>
								<Card.Text>Origin: {catDetails.origin}</Card.Text>
								<Card.Text>{catDetails.description}</Card.Text>
								<Button onClick={() => handleClick()} variant='primary'>
									Back
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Fragment>
	)
}

export default SingleCat
