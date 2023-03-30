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
	limit: number
	setLimit: Dispatch<SetStateAction<number>>
	resultTotal: number
	setResultTotal: Dispatch<SetStateAction<number>>
}

export const CatBrowserContext = createContext<ICatBrowserContext>({
	breeds: [],
	setBreeds: () => {},
	selectedBreed: '',
	setSelectedBreed: () => {},
	limit: 4,
	setLimit: () => {},
	resultTotal: 0,
	setResultTotal: () => {},
})

const CatBrowserProvider = (props: ICatBrowserProviderProps) => {
	const { children } = props
	const [breeds, setBreeds] = useState<ICatBreed[]>([
		{
			name: '',
			id: '',
		},
	])
	const [selectedBreed, setSelectedBreed] = useState<string>('')
	const [limit, setLimit] = useState<number>(4)
	const [resultTotal, setResultTotal] = useState<number>(0)

	return (
		<CatBrowserContext.Provider value={{ breeds, setBreeds, selectedBreed, setSelectedBreed, limit, setLimit, resultTotal, setResultTotal }}>
			{children}
		</CatBrowserContext.Provider>
	)
}

export default CatBrowserProvider
