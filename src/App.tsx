import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MainRoutes from './Routes/MainRoutes'

function App() {
	return (
		<div>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>Cat Browser</Navbar.Brand>
				</Container>
			</Navbar>
			<Container>
				<BrowserRouter>
					<MainRoutes />
				</BrowserRouter>
			</Container>
		</div>
	)
}

export default App
