import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "8aee90ad37c1088bfacad3666898608c";
let cityToCheck = "";
let countryToCheck = "";

class App extends Component {
    // constructor(props) has been deprecated
    state = {
        temperature:    undefined,
        city:           undefined,
        country:        undefined,
        humidity:       undefined,
        description:    undefined,
        list:           undefined,
        error:          undefined,
    }    

    handleCityChange(e){
        cityToCheck = e.target.value;
        console.log(cityToCheck);
     }

     handleCountryChange(e){
        countryToCheck = e.target.value;
        console.log(countryToCheck);
     }

    getWeather = async (e) => {
        // stop page refresh
        e.preventDefault();
        
        // get form values
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        // similar to HTTP request get
        const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
        city + ',' + country + '&units=imperial&appid=' + API_KEY);
        console.log(api_call);
        // similar to json.parse
        const data = await api_call.json();
        console.log(data);
        if (city && country) {

            // never directly manipulate state data
            this.setState({
                temperature:    data.main.temp,
                city:           data.name,
                country:        data.sys.country,
                humidity:       data.main.humidity,
                description:    data.weather[0].description,
                error:          ""
            });
        }
        else {
            this.setState({
                temperature:    undefined,
                city:           undefined,
                country:        undefined,
                humidity:       undefined,
                description:    undefined,
                error:          "Please enter valid location."
            });            
        }

    }

    getFiveDayForecast = async (e) => {
        // stop page refresh
        e.preventDefault();
        console.log('here');
        
        // get form values
        const city = cityToCheck;
        const country = countryToCheck;

        // similar to HTTP request get
        const api_call = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=' +
        city + ',' + country + '&units=imperial&appid=' + API_KEY);
        
        console.log(api_call);
        // similar to json.parse
        const data = await api_call.json();
        console.log(data);
        if (city && country) {

            // never directly manipulate state data
            this.setState({                
                city:           data.city.name,
                country:        data.city.country,
                list:           data.list,
                error:          ""
            });

            console.log(this.state.list);
        }
        else {
            this.setState({
                temperature:    undefined,
                city:           undefined,
                country:        undefined,
                humidity:       undefined,
                description:    undefined,
                error:          "Please enter valid location."
            });            
        }

    }

    render() {
        // Build class names with dynamic data
        var weatherClass = 'wi wi-owm-' + this.state.weather;
        var bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold

        // Set the background colour based on the temperature
        if (this.state.temp >= 30) {
            bgColorClass += 'very-warm';
        }
        else if (this.state.temp > 20 && this.state.temp < 30) {
            bgColorClass += 'warm';
        }
        else if (this.state.temp > 10 && this.state.temp < 20) {
            bgColorClass += 'normal';
        }
        else if (this.state.temp > 0 && this.state.temp < 10) {
            bgColorClass += 'cold';
        }
        else if (this.state.temp <= 0) {
            bgColorClass += 'very-cold';
        }

        return (
            <div>
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div >
                                <Titles />
                            </div >

                            <div className="col-xs-2 form-container" style={{borderColor: '#2a4560', borderStyle: 'solid'}}>
                                <Form getWeather={this.getWeather} getFiveDayForecast={this.getFiveDayForecast} 
                                        handleCityChange={this.handleCityChange} handleCountryChange={this.handleCountryChange} />

                                <Weather 
                                    temperature={this.state.temperature} 
                                    city={this.state.city} 
                                    country={this.state.country} 
                                    humidity={this.state.humidity} 
                                    description={this.state.description} 
                                    list={this.state.list}
                                    error={this.state.error} 
                                />
                            </div >
                        </div >
                    </div >
                </div>
            </div>            
        </div>        
        );
    }
}

            
            
export default App;
