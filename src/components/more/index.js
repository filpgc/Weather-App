// import preact
import { h, render, Component } from 'preact';
import {Router, Route, Link } from 'preact-router';
import { ToastContainer, toast } from 'react-toastify';

// import stylesheets for ipad & button
import style from './style_more';
import style_shared from '../iphone/style';
// import the Location component
import Location from '../location';
// import jquery for API calls
import $ from 'jquery';



export default class more extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);

		//calling the API
		this.fetchWeatherData();
		this.fetchMutipleDays();

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

	// a call to fetch weather data via darksky
	fetchWeatherData = () => {
		var country = "UK";
		var city = "London";
		var url = `https://api.darksky.net/forecast/a47a860c0ddf1a9a480bbea26eb022c8/${this.props.latitude},${this.props.longitude}`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	//parse the above json response
	parseResponse = (parsed_json) => {
		var temp_c = parsed_json['currently']['temperature'];
		var conditions = parsed_json['currently']['summary'];

		temp_c = Math.round((temp_c-32)*0.5556);

		// set states for fields so they could be rendered later on
		this.setState({
			locate: this.props.city,
			temp: temp_c+"°C",
			cond : conditions,
		});
	}


	//call api for the mutiple days forecast via darksky
	fetchMutipleDays = () =>{
		var apiurl = `https://api.darksky.net/forecast/a47a860c0ddf1a9a480bbea26eb022c8/${this.props.latitude},${this.props.longitude}`;
		$.ajax({
			url:apiurl,
			dataType:"jsonp",
			success: this.parseMultipleResponse,
			error : function(req, err){ console.log('Multiple API call failed ' + err); }
		})
	}

	//parse the json response for the multiple days
	parseMultipleResponse = (parsed_json) => {
		var daysWeek = new Array("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday");
		var date = new Date();
		var temp1;
		var temp2;
		var temp3;
		var temp4;
		var temp5;

		var icon1;
		var icon2;
		var icon3;
		var icon4;
		var icon5;

		var day1;
		var day2;
		var day3;
		var day4;
		var day5;

		temp1 = parsed_json['daily']['data'][0]['temperatureHigh'];
		temp1 = Math.round((temp1-32)*0.5556);
		temp1 = temp1+"°C";


		temp2 = parsed_json['daily']['data'][1]['temperatureHigh'];
		temp2 = Math.round((temp2-32)*0.5556);
		temp2 = temp2+"°C";


		temp3 = parsed_json['daily']['data'][2]['temperatureHigh'];
		temp3 = Math.round((temp3-32)*0.5556);
		temp3 = temp3+"°C";

		temp4 = parsed_json['daily']['data'][3]['temperatureHigh'];
		temp4 = Math.round((temp4-32)*0.5556);
		temp4 = temp4+"°C";

		temp5 = parsed_json['daily']['data'][4]['temperatureHigh'];
		temp5 = Math.round((temp5-32)*0.5556);
		temp5 = temp5+"°C";

		icon1 = parsed_json['daily']['data'][0]['icon'];
		icon2 = parsed_json['daily']['data'][1]['icon'];
		icon3 = parsed_json['daily']['data'][2]['icon'];
		icon4 = parsed_json['daily']['data'][3]['icon'];
		icon5 = parsed_json['daily']['data'][4]['icon'];


		day1=daysWeek[(date.getDay()+0)%7];
		day2=daysWeek[(date.getDay()+1)%7];
		day3=daysWeek[(date.getDay()+2)%7];
		day4=daysWeek[(date.getDay()+3)%7];
		day5=daysWeek[(date.getDay()+4)%7];


		//setting the state
		this.setState({
			tempDay1:temp1,
			tempDay2:temp2,
			tempDay3:temp3,
			tempDay4:temp4,
			tempDay5:temp5,
			iconOne:this.iconFinder(icon1),
			iconTwo:this.iconFinder(icon2),
			iconThree:this.iconFinder(icon3),
			iconFour:this.iconFinder(icon4),
			iconFive:this.iconFinder(icon5),
			dayOne:day1,
			dayTwo:day2,
			dayThree:day3,
			dayFour:day4,
			dayFive:day5
		});
	}

	//setting the image for the mutiple days
	//the icon argument comes from the api
	iconFinder= (icon) => {
		var path;
		if (icon=="fog"){
				path='fog.png';
			}
		if (icon=="clear-night"){
					path='clear-night.png';
		}
		if (icon=="clear-day"){
					path='clear-day.png';
		}
		if (icon=="sleet"){
					path='sleet.png';
		}
		if (icon=="wind"){
					path='wind.png';
		}
		if (icon=="cloudy"){
					path='cloudy.png';
		}
		if (icon=="partly-cloudy-day"){
					path='partly-cloudy-day.png';
		}
		if (icon=="partly-cloudy-night"){
					path='partly-cloudy-night.png';
		}
		if (icon=="rain"){
					path="rain.png";
		}
		if (icon=="snow"){
					path="snow.png";
		}

		 return `../../assets/icons/${path}`;
 }




	//rendering method which will display everything to be shown
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style_shared.temperature} ${style.filled}` : style_shared.temperature;
		// display all weather data
		return (
			<div id = "container" class ={ style_shared.container }>
					<div class={ style_shared.header }>
					<div class={ style_shared.city }>{ this.state.locate }</div>
					<div class={ style_shared.undercity }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>

				<div class={ style.details }>
					<div class={style.column}>
					<ul>
						<li class={style.more}>{this.state.dayOne}</li>
						<li class={style.more}>{this.state.dayTwo}</li>
						<li class={style.more}>{this.state.dayThree}</li>
						<li class={style.more}>{this.state.dayFour}</li>
						<li class={style.more}>{this.state.dayFive}</li>
					</ul>
				</div>
				<div class={style.column2}>
				<ul>
					<li class={style.more}><img src ={this.state.iconOne} alt='icon1' class= {style.icons}/> {this.state.tempDay1}</li>
					<li class={style.more}><img src ={this.state.iconTwo} alt='icon2' class= {style.icons}/> {this.state.tempDay2}</li>
					<li class={style.more}><img src ={this.state.iconThree} alt='icon3' class= {style.icons}/> {this.state.tempDay3}</li>
					<li class={style.more}><img src ={this.state.iconFour} alt='icon4' class= {style.icons}/> {this.state.tempDay4}</li>
					<li class={style.more}><img src ={this.state.iconFive} alt='icon5' class= {style.icons}/> {this.state.tempDay5}</li>
				</ul>
			</div>
			</div>
				<div class = {style_shared.bottom}>
						<Link href = {'/'} class={style_shared.buttonleft}> </Link>
						<Link href = {'/extrainformation'} class={style_shared.buttoncenter}> </Link>
						<Link href = {'/locations'} class={style_shared.buttonright}> </Link>
				</div>
			</div>
		);
	}
}
