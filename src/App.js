import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "8aee90ad37c1088bfacad3666898608c";

class App extends Component {
    // constructor(props) has been deprecated
    state = {
        temperature:    undefined,
        city:           undefined,
        country:        undefined,
        humidity:       undefined,
        description:    undefined,
        error:          undefined,
    }

    getWeather = async (e) => {
        // stop page refresh
        e.preventDefault();

        // get form values
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        // similar to HTTP request get
        const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
        city + ',' + country + '&units=metric&appid=' + API_KEY);
        
        // similar to json.parse
        const data = await api_call.json();

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

    render() {
        return (
            <div>
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-4 title-container">
                                <Titles />
                            </div >

                            <div className="col-xs-7 form-container">
                                <Form getWeather={this.getWeather} />

                                <Weather 
                                    temperature={this.state.temperature} 
                                    city={this.state.city} 
                                    country={this.state.country} 
                                    humidity={this.state.humidity} 
                                    description={this.state.description} 
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
