import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import SunBg from './assets/sun-weather.jpg';
import RainBg from './assets/rain-weather.jpg';
import CloudBg from './assets/cloud-weather.jpg';


import ClearIcon from './assets/Clear.svg';
import CloudsIcon from './assets/Clouds.svg';
import RainIcon from './assets/Rain.svg';
function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('ternopil');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=341bc5425ac04419278b5d01ca45f955`;
  const iconUrl =`http://openweathermap.org/img/w/`;
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      searchLocation('')

    }
  };
  const searchLocationMobile = () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
  }
  return (
    <div  className="app" 
          style={data.main ? 
                data.weather[0].main === 'Clear' ? {background: "url("+ SunBg +") center center / cover no-repeat"}  
                : {background: "url("+ CloudBg +") center center / cover no-repeat"} : null}
                >
      <div className="search">
        <input 
            type="text"
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder='Enter Location'
            onKeyPress={searchLocation}
            />
        <button onClick={searchLocationMobile} value={location}>Search</button>
      </div>
      <div className="container">
        <div className="top">
            <div>
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{ Math.round(data.main.temp) - 273 }°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main} </p> : null}
              </div>
            </div>
            {data.weather ? <img src={
                                        data.weather[0].main === 'Clear' ? 
                                        ClearIcon : 
                                        data.weather[0].main ==='Clouds' ?
                                        CloudsIcon :
                                        data.weather[0].main === 'Rain' ?
                                        RainIcon :
                                        null
                                      } 
                                        alt="" 
                                      /> : null }

        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{ Math.round(data.main.feels_like) - 273 }°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{Math.round(data.wind.speed)}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
