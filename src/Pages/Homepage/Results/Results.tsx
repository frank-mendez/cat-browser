import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Row, Card, Col, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ImageLoader from '../../../Common/ImageLoader'
import { CatBrowserContext } from '../../../Context/CatBrowserProvider'

interface CatDetails {
	id: string
	url: string
}

const Results = () => {
	const { selectedBreed, limit, setLimit, resultTotal, setResultTotal } = useContext(CatBrowserContext)
	const navigate = useNavigate()

	const [searchResult, setSearchResult] = useState<CatDetails[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		if (selectedBreed) {
			setIsLoading(true)
			axios
				.get(`${process.env.REACT_APP_API_URL}images/search?breed_ids=${selectedBreed}&limit=${limit}`, {
					headers: {
						'x-api-key': process.env.REACT_APP_CAT_API_KEY,
					},
				})
				.then((data: any) => {
					console.log('data', data)
					setSearchResult(data.data)
					setResultTotal(data.data.length)
					setIsLoading(false)
				})
				.catch((err: any) => {
					console.error('error', err)
					setIsLoading(false)
					//setError(true)
				})
		}
	}, [selectedBreed, limit])

	const handleClick = (id: string) => {
		console.log('id', id)
		navigate(`/${id}`)
	}

	const handleLoadMore = () => {
		setLimit(limit + 4)
	}

	return (
		<Fragment>
			{isLoading ? (
				<Spinner style={{ margin: 'auto', marginTop: '30px' }} animation='border' />
			) : (
				<Fragment>
					<h4 className='mt-5'>Results</h4>
					<Row>
						{searchResult &&
							searchResult.map((cat: CatDetails) => {
								return (
									<Col key={cat.id} className='mt-5' sm={3}>
										<Card>
											<ImageLoader src={cat.url} />
											<Card.Body>
												<Button className='btn-block' onClick={() => handleClick(cat.id)} variant='primary'>
													View Details
												</Button>
											</Card.Body>
										</Card>
									</Col>
								)
							})}
					</Row>
					{searchResult.length === 0 && 'No results found'}
				</Fragment>
			)}
			{selectedBreed && (
				<Row className='mt-5 mb-5'>
					<Col>
						{limit !== resultTotal ? (
							<Fragment>{!isLoading && <p className='mt-5'>All cats have been loaded</p>}</Fragment>
						) : (
							<Button onClick={handleLoadMore} disabled={searchResult.length === 0} variant='success'>
								{isLoading ? 'Loading cats..' : 'Load more'}
							</Button>
						)}
					</Col>
				</Row>
			)}
		</Fragment>
	)
}

export default Results
