import React from 'react'
import LandingPage from './components/pages/LandingPage'

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
      		<Routes>
        		<Route exact path="/" element = { <LandingPage /> }/>
      		</Routes>
    	</BrowserRouter>
	)
}

export default App