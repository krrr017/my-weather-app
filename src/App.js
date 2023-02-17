import { useState } from "react";
import DetailCard from "./components/DetailCard";
import SummaryCard from "./components/SummaryCard";

function App() {
  const REACT_APP_URL = process.env.REACT_APP_URL
  const REACT_APP_ICON_URL = process.env.REACT_APP_ICON_URL
  const API_KEY = process.env.REACT_APP_API_KEY

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
    //<div className="bg-gray-800 flex items-center justify-center w-screen h-screen py-10">
      <div className="lg:flex flex-row items-center justify-center w-screen lg:h-screen rounded-3xl m-auto bg-white">
          {/* form card section  */}
        <div className="p-5 rounded-lg basis-1/3 lg:h-full bg-amber-200">
          <div className="flex items-center justify-center lg:mt-5">
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
            <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center lg:my-20 mt-3">
            <h1 className="text-amber-500 text-3xl">Weather Forecast</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
              <input type="text" 
                placeholder="Enter location" 
                className="relative rounded-xl py-2 px-3 w-2/3 bg-white bg-opacity-60 text-gray-700 placeholder-gray-400"
                onChange={handleChange} 
                required />
                <button type="submit" className="z-10">
                  <i className="fa fa-search text-gray-500 -ml-10 border-l my-auto z-10 cursor-pointer p-3" 
                  aria-hidden="true" type="submit"></i>
                </button>
            </form>
          </div>
        </div>
        {/* info card section  */}
        <div className="basis-2/3 p-5 h-full">
          
          <div className="flex flex-col ">
            {/* card jsx  */}
            {weatherData.length === 0 ? 
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-amber-400 text-4xl font-bold uppercase">{noData}</h1>
              </div> :
              <>
              <div className="container lg:mt-4 w-full">
                <h1 className="text-3xl text-gray-600 mt-auto mb-4">Today</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
              </div>
              <div className="container lg:mt-4 w-auto">
                <h1 className="text-3xl text-gray-600 mb-4 mt-10">Every 3 Hour in {city}</h1>
                <ul className="grid grid-cols-2  gap-2">
                  {weatherData.list.map( (days, index) => {
                    return (
                      <SummaryCard key={index} day={days} />
                    )
                  
                  })}
                </ul>
              </div>
              </>
            }
          </div>
        </div>
      </div>
    //</div>
  );
}

export default App;