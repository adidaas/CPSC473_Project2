import React from 'react'

const Weather = (props) => {

    var currentDate = new Date();
    var previousDate = new Date('2010-5-5');
    var boxShadow =  "10px 5px 5px black";
    return (
        <div style={{margin: 10}}>
                {
                    props.city && props.country &&                     
                    <p className="weather__key">Location: 
                    <span  className="weather__value"> {props.city}, {props.country}</span>
                    </p>   
                }
                { 
                    props.temperature && 
                    <div><h2 className="weather__heading" style={{color: 'white'}}>Current Weather: </h2>                    
                    </div>
                }
                { 
                    props.temperature && <p className="weather__key">Temperature: 
                    <span className="weather__value"> {props.temperature}°</span>
                    </p>
                }
                { 
                    props.humidity && <p className="weather__key">Humidity: 
                    <span className="weather__value"> {props.humidity}</span>
                    </p>
                }
                { 
                    props.description && <p className="weather__key">Conditions: 
                    <span className="weather__value"> {props.description}</span>
                    </p>
                }             
                {        
                    props.list &&             
                    <div style={{color:'white'}}>
                    <h2 className="weather__heading">Forecast: </h2>
                    <ul style={{listStyleType: 'none'}}>
                        {props.list.map(function(item, index){
                            currentDate = new Date(item.dt_txt);  

                            console.log('current:'  + currentDate.getDate());
                            console.log('previous:'  + previousDate.getDate());

                            if (currentDate.getDate() != previousDate.getDate()) {
                                previousDate = new Date(currentDate);
                                return (
                                    <li style={{color:'black', backgroundColor: '#ffff99', fontWeight: 800, width: 160, 
                                            height: 250, margin: 3, textAlign: 'center', float: 'left', border: 'solid',
                                            borderColor: '#b2b26b' }}>
                                        {currentDate.getMonth()}-{currentDate.getDate()}-{currentDate.getFullYear()}
                                        <p></p>
                                        <h2> {item.main.temp}°</h2>
                                        <p>{item.weather[0].description}</p>
                                        <p>Humidity: {item.main.humidity}</p>
                                        <p>Wind Speed: {item.wind.speed}</p>
                                    </li>
                                )       
                                
                            }
                            
                            console.log('3');
                            console.log('previous again:'  + previousDate.getDate());
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
