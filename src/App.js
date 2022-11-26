import { useState } from "react";
import DetailCard from "./components/DetailCard";
import SummaryCard from "./components/SummaryCard";

function App() {
  const REACT_APP_URL = 'https://api.openweathermap.org/data/2.5/forecast?'
  const REACT_APP_ICON_URL = 'https://openweathermap.org/img/wn/'
  const API_KEY = '762b3d4401303f87b5e222aa073e6660'

  const [noData, setNoData] = useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Unknown location')
  const [weatherIcon, setWeatherIcon] = useState(`${REACT_APP_ICON_URL}10n@2x.png`)


  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }
  const handleChange = (input) => {
    const {value} = input.target
    setSearchTerm(value)
  }

  const getWeather = async (location) => {
    setWeatherData([])
    let how_to_search = `q=${location}` 

    try {
      let res = await fetch(`${REACT_APP_URL+how_to_search}
      &appid=${API_KEY}&units=metric&cnt=4`)
      let data = await res.json()
      if(data.cod !== "200") {
        setNoData('Location Not Found')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${REACT_APP_ICON_URL+data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log("error encountered" +error)
    }

    console.log(weatherData);

  }

  return (
    <div className="bg-gray-800 flex items-center justify-center w-screen h-screen py-10">
      <div className="flex w-full min-h-full max-h-full rounded-3xl shadow-lg m-auto bg-amber-100">
          {/* form card section  */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
            <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-2xl drop-shadow-md">Get Ready with Weather Forecast</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
              <input type="text" 
                placeholder="Enter location" 
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                onChange={handleChange} 
                required />
                <button type="submit" className="z-10">
                  <i className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3" 
                  aria-hidden="true" type="submit"></i>
                </button>
            </form>
          </div>
        </div>
        {/* info card section  */}
        <div className="w-2/3 p-5">
          
          <div className="flex flex-col">
            {/* card jsx  */}
            {weatherData.length === 0 ? 
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-white text-4xl font-bold uppercase">{noData}</h1>
              </div> :
              <>
                <h1 className="text-3xl text-gray-600 mt-auto mb-4">Today</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="text-3xl text-gray-600 mb-4 mt-10">Every 3 Hour in {city}</h1>
                <ul className="grid grid-cols-2  gap-2">
                  {weatherData.list.map( (days, index) => {
                    return (
                      <SummaryCard key={index} day={days} />
                    )
                  
                  })}
                </ul>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;