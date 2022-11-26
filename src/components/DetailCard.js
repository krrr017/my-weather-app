import moment from 'moment';

function DetailCard({weather_icon, data}) {
    const {clouds, main, weather, dt_txt} = data.list[0]

    return (
        <div className="container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/3 mb-auto ">
            <div className="my-auto">
                <p className="font-bold text-5xl text-amber-600 mb-2">{Math.round(main.temp)}&deg;C</p>
                <p className="text-4xl text-gray-800 tracking-widest">{weather[0].main}
                    <img src={weather_icon} className="w-1/4 inline" alt='' />
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{weather[0].description}</p>
                <p className="tracking-wider">{moment(dt_txt).format("dddd MMM YYYY")}</p>
            </div>
            <div className="my-2 border-l-2 border-gray-100 p-2">
                <p className="text-gray-400 text-lg">Feels Like: {Math.round(main.feels_like)}&deg;C</p>
                <p className="text-gray-400 text-lg">Humidity: {main.humidity}%</p>
                <p className="text-gray-400 text-lg">Cloud Cover: {clouds.all}%</p>
            </div>
        </div>
    )
}



export default DetailCard