  
import React, { Component } from 'react';
import './App.css';
import ZipSearch from './components/zipSearch';
import CitySearch from './components/citySearch';

class App extends Component {
	render() {
		return (
			<div className = "App-header">
				<ZipSearch />
				<CitySearch />
			</div>
		);
	}
}

export default App;	