import { h, render, Component } from 'preact';
import {Router, Route, Link } from 'preact-router';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { ToastContainer, toast } from 'react-toastify';

// import stylesheets from location folder
import style from './style';
import style_shared from '../iphone/style';

import Map from '../map';

export default class locationButton extends Component{
  //constructor setting initial states
  constructor(props) {
      super(props);
      this.onChange = (address) => this.setState({ address });
      this.state ={
        url: `https://www.google.com/maps/embed/v1/place?key=AIzaSyCjwXVLvZFIyw1ohtyuKgINDJhYNy1k-4I&q=${this.props.country}+${this.props.city}`  //Alternative key: 16de349eb553292a82eb79bc2a52b617
      }
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

    //this gets called when the tick (submit) is clicked
  handleClickSubmit = () => {
      geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => this.change(lat,lng))
      .catch(error => console.error('Error', error))
    }

    //this then gets called after handleClickSubmit and processes the new lat and longitude
    //the map also gets update via updating the url
    change = (tmpLat, tmpLng) => {
      var tmp = this.state.address;
      var arrofAddress = tmp.split(", ");
      var lengthofArr = arrofAddress.length;
      var newLat = tmpLat;
      var newLong = tmpLng;
      this.setState({
        url: `https://www.google.com/maps/embed/v1/place?key=AIzaSyCjwXVLvZFIyw1ohtyuKgINDJhYNy1k-4I&q=${arrofAddress[lengthofArr-1]}+${arrofAddress[lengthofArr-2]}`
      })
      toast(tmp+" has been selected");
      //calling the prop method from within index.js (iPhone) this then updates the country and city for ALL children components
      this.props.changeLocation(arrofAddress[lengthofArr-1],arrofAddress[lengthofArr-2],newLat,newLong);
    }

    //rendering method which shows what to be displayed
    render() {
      const inputProps = {
        value: this.state.address,
        onChange: this.onChange
      }

      return(
        <div id="container" class ={ style.container }>

            <div class={ style.header}>
            <div class={ style.search}>CHOOSE YOUR LOCATION</div>
              <form>
                <PlacesAutocomplete inputProps={inputProps} />
                <button type="button" onClick={this.handleClickSubmit} class={style.button}></button>
                  <ToastContainer autoClose={false}/>
              </form>
                  <Map url = {this.state.url}/>
            </div>
            <div class = {style_shared.bottom}>
              <Link href = {'/'} class={style_shared.buttonleft}> </Link>
              <Link href = {'/extrainformation'} class={style_shared.buttoncenter}> </Link>
              <Link href = {'/locations'} class={style_shared.buttonright}>  </Link>
            </div>
        </div>
      );
    }
}
