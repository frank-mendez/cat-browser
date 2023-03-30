import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

interface ICatBrowserProviderProps {
	children: React.ReactNode
}

interface ICatBreed {
	name: string
	id: string
}

interface ICatBrowserContext {
	breeds: ICatBreed[]
	selectedBreed: string
	setBreeds: Dispatch<SetStateAction<ICatBreed[]>>
	setSelectedBreed: Dispatch<SetStateAction<string>>
}

export const CatBrowserContext = createContext<ICatBrowserContext>({
	breeds: [],
	setBreeds: () => {},
	selectedBreed: '',
	setSelectedBreed: () => {},
})

const CatBrowserProvider = (props: ICatBrowserProviderProps) => {
	const { children } = props
	const [breeds, setBreeds] = useState([
		{
			name: '',
			id: '',
		},
	])
	const [selectedBreed, setSelectedBreed] = useState('')

	return <CatBrowserContext.Provider value={{ breeds, setBreeds, selectedBreed, setSelectedBreed }}>{children}</CatBrowserContext.Provider>
}

export default CatBrowserProvider
