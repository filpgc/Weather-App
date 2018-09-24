 

#  Weather App
Implementation of a Weather app using PreactJS and CSS.
The homepage has three different options. One is for the homepage, which displays the weather forecast for today as well as a recommendation of what clothing to wear for the prevalent conditions. The next option displays a five-day weather forecast, which shows only the day and the forecast temperature. The last option allows the user to select a different location and shows the weather forecast for that location.
The weather app is primarily built using PreactJS, a lightweight version of ReactJS. Styling is done using CSS.
Contents
Technology Stack
Requirements
Installation
Operation
Live Preview
Installation
Technology Stack
1.    PreactJS
2.    CSS
3.    JavaScript
Requirements
1.    PreactJS
2.    CSS
3.    JavaScript
Installation
1.    Download the repository or clone it
2.    Run “NPM Install”
3.    Run “NPM Run Dev”
4.    View in your web browser
Operation
The app should have loaded you onto the homepage, where you will be able to see the weather forecast for today, and a recommendation of what clothes to wear to ensure you are well suited for the conditions. On the bottom of the page, you will be presented with three different buttons. The first is a link back to the homepage, the second shows you the forecast for the next five days, and the third which allows you to pick a location and view the weather forecast at that location.
Additionally, the app also has push notifications which display the recommendation of what clothes to wear. This gives the user the information they require without having to open the app.
Live Preview

Screenshot


<a href="https://ibb.co/hehuUn"><img src="https://image.ibb.co/kbA3N7/Picture2.png" alt="Picture2" width="330" hight="700" border="0"></a>

<a href="https://ibb.co/mB42FS"><img src="https://image.ibb.co/hpiJpn/Picture1.png" alt="Picture1" width="330" hight="700" border="0"></a>

Selected notification and Google Maps Api.

<a href="https://ibb.co/bKef27"><img src="https://preview.ibb.co/jmAW9n/picture3.jpg" alt="Picture3" width="700" hight="1400"  border="0"></a>











# Preact Boilerplate / Starter Kit for a Weather App

## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Quick Boilerplate Overview](#quick-boilerplate-overview)
- [Extra Info](#extra-info)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**

```sh
node -v
npm -v
```

## Installation

**1. Clone this repository :**

```sh
git clone --depth 1 https://github.com/nenee/weatherapp-boilerplate.git weather-app
cd weather-app
```

**2. Make it your own :**

```sh
rm -rf .git && git init && npm init
```

> :information_source: Command above re-initializes the repo and sets up your NPM project.


**3. Install the dependencies :**

```sh
npm install
```

## Development Workflow


**4. Start a live-reload development server :**

```sh
npm run dev
```

> This is a full web server for your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**5. Generate a production build in `./build` :**

```sh
npm run build
```

**6. Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

> This simply serves up the contents of `./build`. Bear in mind, if you use this, the localhost port your server is running on will refresh, and you'll also need to restart it to see any changes you've made to the code in `src`.


## Quick Boilerplate Overview

- The initial run will display the iPhone version (iPhone 6/7 Plus screen size); however, if you modify the path on the url bar by adding "/ipad", you can view the tablet version (iPad Air screen size).

- The CSS pre-processor in use is Less. You don't have to worry about the syntax and just write in normal CSS as there are helper modules to assist you (located in `style/helpers`).

- There are many weather APIs out there; this boilerplate uses WeatherUnderground, which I highly recommend for any detailed info you may need; sign up is free and you can find out more about it here : 
https://www.wunderground.com/weather/api/d/docs?MR=1 There's also a console, where you can check out particular responses : https://apigee.com/console/wunderground

- Most importantly, have fun with it ! 👌


## Extra Info

1. Handling URLS

:information_source: You can use URL Routing as defined [here](http://git.io/preact-router).

Pages are just regular components that get mounted when you navigate to a certain URL. Any URL parameters get passed to the component as `props`.

Defining what component(s) to load for a given URL is easy and declarative. You can even mix-and-match URL parameters and normal props.

```js
<Router>
  <A path="/" />
  <B path="/b" id="42" />
  <C path="/c/:id" />
</Router>
```
