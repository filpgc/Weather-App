// import preact
import { h, render, Component } from 'preact';
import {Router, Route, Link, browserHistory} from 'preact-router';

// import the different components
import Location from '../location';
import Home from './homepage';
import More from '../more';

//creating the class
export default class Iphone extends Component {
	//the constructor declares and initialises state variables the country, city, longitude and latitude
	//these state variables will be passed as props to it's children
	constructor(){
		super();
		this.state.country = "UK";
		this.state.city = "London";
		this.state.latitude= 51.5073509;
		this.state.longitude = -0.12775829999998223;
	}

	//this function will be used to update the city, country, longitude and latitude when the location is changed
	//this function will be passed as props to the Location component so that component can call this method, cause a change in state
	changeLocation = (newCountry, newCity, newLat, newLong) =>{
		this.setState({
			country:newCountry,
			city:newCity,
			latitude:newLat,
			longitude:newLong
		});
	}

	//inside the render method the Router element sets up the different paths the weather application will take
	//the chosen path has a corresponding component it will go to and render
	//e.g '/' (which is the root) will render homepage.js
	//each component will have a number of props passed to it, so it can access the API etc
	render() {
		return (
			<Router>
				<Route path="/" component={() => <Home country={this.state.country} city={this.state.city} latitude={this.state.latitude} longitude={this.state.longitude}/> }/>
				<Route path="/locations" component={() => <Location country={this.state.country} city={this.state.city} changeLocation = {this.changeLocation}/> }/>
				<Route path="/extrainformation" component={() => <More country={this.state.country} city={this.state.city} latitude={this.state.latitude} longitude={this.state.longitude}/>} />
			</Router>
		);
	}
}
