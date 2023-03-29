import React, { createContext, useState } from 'react'

type CatBrowserProviderProps = {
	children: React.ReactNode
}

interface CatBrowserState {
	breeds: string[]
	setBreeds: React.Dispatch<React.SetStateAction<never[]>>
}

const catStateDefaultValues: CatBrowserState = {
	breeds: [],
	setBreeds: () => {},
}

export const CatBrowserContext = createContext<CatBrowserState>(catStateDefaultValues)

const CatBrowserProvider = (props: CatBrowserProviderProps) => {
	const { children } = props
	const [breeds, setBreeds] = useState([])

	return <CatBrowserContext.Provider value={{ breeds, setBreeds }}>{children}</CatBrowserContext.Provider>
}

export default CatBrowserProvider
