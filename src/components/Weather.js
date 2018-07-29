import React from 'react'

const Weather = (props) => {


    return (
        <div>
                { 
                    props.city && props.country && <p className="weather__key">Location: 
                    <span  className="weather__value">{props.city}, {props.country}</span>
                    </p>
                }
                { 
                    props.temperature && <p className="weather__key">Temperature: 
                    <span className="weather__value">{props.temperature}</span>
                    </p>
                }
                { 
                    props.humidity && <p className="weather__key">Humidity: 
                    <span className="weather__value">{props.humidity}</span>
                    </p>
                }
                { 
                    props.description && <p className="weather__key">Conditions: 
                    <span className="weather__value">{props.description}</span>
                    </p>
                }             
                {                     
                    <div>
                    <h2>Forecast: </h2>
                    <ul>
                        {props.list.map(function(item, index){
                            return (
                            <div style={{color:'white'}}>
                                <strong>Date</strong> {item.dt_txt}
                                <p>Temperature: {item.main.temp}</p>
                                <p>Humidity: {item.main.humidity}</p>
                                <p>Wind Speed: {item.wind.speed}</p>
                            </div>
                            )
                        })
                        }
                    </ul>
                    </div>
                }                
                {
                    props.error && <p className="weather__key">
                    <span className="weather__value">{props.error}</span>
                    </p>
                }
                
            </div>
    );
}

export default Weather;
