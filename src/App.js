import React,{useState,useEffect} from 'react';
import './App.css';

function App() {
 
  const key="667bfff3016673b3462208fbe074aacd";
  const [query, setQuery] = useState('New Delhi');
  const [result,setResult] = useState('');
  const dateBuilder = (d)=>
  {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${key}`)
      .then(res => res.json())
      .then(resul =>
        {
          setQuery('');
          setResult(resul);
          //  console.log(resul);
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

  const searchNow = Event=>
  {
    if(Event.key==="Enter")
    {
      // ${API.base}weather?q=${query}&units=metrics&APPID=${API.key}
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${key}`)
      .then(res => res.json())
      .then(resul =>
        {
          setQuery('');
          setResult(resul);
          //  console.log(resul);
        })
     

    }
  }

  

  

  return (
    <div className={typeof result.main!="undefined"?(result.main.feels_like>25?`app`:`app cold`):(`app`)}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="search here..."
          value={query} onChange={e=>setQuery(e.target.value)} onKeyPress={searchNow} />
        </div>
        {(typeof result.main!="undefined")? (
          <div>
          <div className="location-box">
          <div className="location">{result.name}, {result.sys.country}</div> 
          <div className="location-date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
            {Math.floor(result.main.feels_like)}°C
          </div>
          <div className="type">
            {result.weather[0].main}
          </div>
        </div>
        </div>
        ):(<div>
            <div className="location-box">
            <div className="location">Sorry City Not found..Try Again</div> 
            <div className="location-date">{dateBuilder(new Date())}</div>
          </div>
        </div>
          )}

        
      </main> 
    </div>
  );
}

export default App;
