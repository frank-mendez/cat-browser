import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Row, Card, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ImageLoader from '../../../Common/ImageLoader'
import { CatBrowserContext } from '../../../Context/CatBrowserProvider'

interface CatDetails {
	id: string
	url: string
}

const Results = () => {
	const { selectedBreed } = useContext(CatBrowserContext)
	const [limit, setLimit] = useState(10)
	const [searchResult, setSearchResult] = useState<CatDetails[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		if (selectedBreed) {
			console.log('selectedBreed', selectedBreed)
			axios
				.get(`${process.env.REACT_APP_API_URL}images/search?breed_ids=${selectedBreed}&limit=${limit}`, {
					headers: {
						'x-api-key': process.env.REACT_APP_CAT_API_KEY,
					},
				})
				.then((data: any) => {
					console.log('data', data)
					setSearchResult(data.data)
				})
				.catch((err: any) => {
					console.error('error', err)
					//setError(true)
				})
		}
	}, [selectedBreed, limit])

	const handleClick = (id: string) => {
		console.log('id', id)
		navigate(`/${id}`)
	}

	return (
		<Fragment>
			<h4 className='mt-5'>Results</h4>
			<Row>
				{searchResult &&
					searchResult.map((cat: CatDetails) => {
						return (
							<Col key={cat.id} className='mt-5' sm={4}>
								<Card>
									<ImageLoader src={cat.url} />
									<Card.Body>
										<Button onClick={() => handleClick(cat.id)} variant='primary'>
											Go somewhere
										</Button>
									</Card.Body>
								</Card>
							</Col>
						)
					})}
			</Row>
			<Row className='mt-5 mb-5'>
				<Col>
					<Button variant='primary'>Load more</Button>{' '}
				</Col>
			</Row>
		</Fragment>
	)
}

export default Results
