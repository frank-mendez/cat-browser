import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from '../Pages/Homepage/Homepage'
import SingleCat from '../Pages/SingleCat/SingleCat'

interface RouteItem {
	path: string
	element: JSX.Element
}

const MainRoutes = () => {
	const routes: RouteItem[] = [
		{ path: '/', element: <Homepage /> },
		{ path: '/:id', element: <SingleCat /> },
	]

	return (
		<Routes>
			{routes.map((route) => {
				return <Route key={route.path} path={route.path} element={route.element} />
			})}
		</Routes>
	)
}

export default MainRoutes
