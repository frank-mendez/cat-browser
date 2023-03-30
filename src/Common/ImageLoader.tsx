import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'

interface ImageLoaderProps {
	src: string
}

const ImageLoader = (props: ImageLoaderProps) => {
	const [isLoading, setIsLoading] = useState(true)

	const { src } = props

	const handleLoad = () => {
		setIsLoading(false)
	}

	return (
		<>
			{isLoading && <Spinner style={{ margin: 'auto', marginTop: '30px' }} animation='border' />}
			<img alt={src} style={{ visibility: isLoading ? 'hidden' : 'visible' }} onLoad={handleLoad} className='img-fluid' src={src} />
		</>
	)
}

export default ImageLoader
