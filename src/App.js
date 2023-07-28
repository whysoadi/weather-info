import './App.css';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React, {useState} from 'react'
import axios from 'axios';


function App() {
   
const [data, setData] = useState({});
const [location, setLocation]=useState(' ');


const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=c223886163a50e444ac7bf6a348c9663`;



const searchbar= (event)=>{
  if(event.key==='Enter'){
 axios.get(url).then((res)=>{
    setData(res.data)
    console.log(res.data)
  })
  setLocation(' ');
}
}


  return (
    <div className="app">
      <div className="search">
        <input value={location} onChange={event=>setLocation(event.target.value)} onKeyDown={searchbar} type="text" placeholder='Enter location' />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
           <h3>{data.name}</h3>
          </div>
          <div className="country">
          { data.sys? <h2>{data.sys.country}</h2> : null}
          </div>
          <div className="temperature">
            {data.main? <h1>{((data.main.temp-32) *(5/9)).toFixed()} °C</h1> :null}
          
          </div>
          <div className="description-2" style={{textTransform:"capitalize"}}>
            {data.weather ? <h3>{data.weather[0].description}</h3>:null }

          </div>
          <div className="description">
            {data.weather? <h3>{data.weather[0].main}</h3> : null}
          </div>
        </div>
        <div className="bottom">
        <div className="wind">
       
            <WbSunnyIcon fontSize="large"/>
            <p>Sunrise</p>

            {data.sys? <p>{new Date(data.sys.sunrise * 1000).toLocaleString('default')}</p>: null }
            </div>
          <div className="feels">
          <WbTwilightIcon fontSize="large"  />
          <p>Sunset</p>

          {data.sys? <p>{new Date(data.sys.sunset * 1000).toLocaleString('default')}</p>: null }
          </div> 
        </div>
        <div className="bottom-2">
          <div className="feels">
         {data.main? <p className='bold'>{data.main.feels_like} °F </p> : null}
          <p>Feels Like</p>
          </div>
          <div className="humdity">
           {data.main? <p className='bold'>{data.main.humidity}%</p>: null}
            <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind? <p className='bold'>{data.wind.speed} MPH</p>: null}
              <p>Wind Speed</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
