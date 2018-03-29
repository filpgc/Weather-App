// import preact
import { h, render, Component } from 'preact';
//import the router and link
import {Router, Route, Link } from 'preact-router';
//import the notifications
import { ToastContainer, toast } from 'react-toastify';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Location from '../location';
import More from '../more';



export default class home extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// button display state
		this.fetchWeatherData();

	}

	//function runs once rendered and checks every 50000 milliseconds
	//changes the background dynamically
	componentDidMount(){
		setInterval(
      () => this.updateBackground(),
      50000);
	}

	//this function gets called from above
	//checks the current hours then changes the background dynamically
	updateBackground = () => {
		var date = new Date();
		var currentHours;
		currentHours = date.getHours();
		if(currentHours<18&&currentHours>=9){
			$("#container").css("background-image","url(../../assets/backgrounds/morningBackground.png)");
		}
		else{
			$("#container").css("background-image","url(../../assets/backgrounds/eveningBackground.png)");
		}
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		console.log("Function running");
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = `https://api.darksky.net/forecast/a47a860c0ddf1a9a480bbea26eb022c8/${this.props.latitude},${this.props.longitude}`;    //Alternative key: 16de349eb553292a82eb79bc2a52b617
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	//parses the json response
	parseResponse = (parsed_json) => {
		var temp_c = parsed_json['currently']['temperature'];
		var conditions = parsed_json['currently']['summary'];

		temp_c = Math.round((temp_c-32)*0.5556);

		// set states for fields so they could be rendered later on
		this.setState({
			locate: this.props.city,
			date : this.calendarDate(),
			temp: temp_c+"°C",
			prevision: ('IT WILL BE ' + conditions+ " TODAY,"),
			advise:"CYCLE WITH " + this.adviseWear(temp_c) +"",
			icon: this.iconWear(temp_c)
		});
		//call the notification method after state has been changed
		this.notify();
	}

	//notification method
	notify = () => {
		toast(this.state.advise);
	}

	//this returns the day and the month which is shown on the homepage.js
	calendarDate = () =>{
		var nameMonth = new Array("January","February","March","April","May","June","July","August","September", "October", "November","December");
		var dateObj = new Date();
		var month = dateObj.getUTCMonth(); //months from 0-11
		var day = dateObj.getUTCDate();
		return (day + " " + nameMonth[month]) ;

	}

	//this method advises what to wear
	//calculates it via the current temp
	adviseWear = (temp_c) => {
			if (temp_c<0 && temp_c>=-10){
				return'A JACKET SUITABLE FOR FREEZING WEATHER!';
			}
		  else if (temp_c<3 && temp_c>=0){
				return'SOME GLOVES AND A HAT! ';
			}
			else if (temp_c<5 && temp_c>=3){
				return'SOME GLOVES! ';
			}
			else if (temp_c<10 && temp_c>=5){
				return'A WINDPROOF JACKET! ';
			}
			else if (temp_c<15 && temp_c>=10){
				return'LONG TROUSERS! ';
			}
			else if (temp_c<20 && temp_c>=15){
				return'A LONG SLEEVES TOP! ';
			}
			else if (temp_c<25 && temp_c>=20){
				return'A PAIR OF SUNGLASSES! ';
			}
			else if (temp_c<30 && temp_c>=25){
				return'A LIGHT AND BREATHEABLE SHORTS! ';
			}
			else if (temp_c<35 && temp_c>=30){
				return'WEAR SUNSCREEN 50+! ';
			}
	}

	//this method detects what image to use for advising what to wear
	iconWear = (temp_c) => {
		 var path;
		 if (temp_c<0 && temp_c>=-10){
 			 path='coldjacket.png';
 		 }
		 else if (temp_c<3 && temp_c>=0){
			 path="gloves.png";
		 }
		 else if (temp_c<5 && temp_c>=3){
			  path="gloves.png";
		 }
		 else if (temp_c<10 && temp_c>=5){
			 path="jacket.png";
		 }
		 else if (temp_c<15 && temp_c>=10){
			 path="trousers.png"
		 }
		 else if (temp_c<20 && temp_c>=15){
			 path='longshirt.png';
		 }
		 else if (temp_c<25 && temp_c>=20){
			 path="sunglasses.png"
		 }
		 else if (temp_c<30 && temp_c>=25){
			 path="shorts.png"
		 }
		 else if (temp_c<35 && temp_c>=30){
			 path="suncream.png"
		 }
			return `../../assets/icons/${path}`;
	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.undercity }>{ this.state.date }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class={ style.prevision }>{ this.state.prevision }</div>
				<div class={ style.advise }>{ this.state.advise }<img src ={this.state.icon} alt='icon' class= {style.icons}/></div>
				<div class = {style.bottom}>
					<Link href = {'/'} class={style.buttonleft}> </Link>
					<Link href = {'/extrainformation'} class ={style.buttoncenter}> </Link>
					<Link href = {'/locations'} class={style.buttonright}>  </Link>
          <ToastContainer autoClose={10000}/>
				</div>
			</div>
		);
	}
}
