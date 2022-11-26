import moment from 'moment'

function SummaryCard({day}) {
    let day_icon = `${REACT_APP_ICON_URL + day.weather[0]["icon"]}@2x.png`
    return (
        <li className="container p-4 flex items-center justify-center bg-white shadow-lg rounded-lg my-auto mr-1">
            <div className="my-4">
                <p className="font-bold text-3xl text-amber-500 mb-2">{Math.round(day.main.temp)}&deg;C</p>
                
                <p className="text-gray-400 text-xs uppercase tracking-widest">{day.weather[0].description}</p>
                <p className="tracking-wider">{moment(day.dt_txt).format("hh:mm A dddd")}</p>
            </div>
            <div className='my-2 p-2'>
                <p className="text-2xl text-gray-800 tracking-widest">{day.weather[0].main}
                    <img src={day_icon} className="w-1/2" alt='' />
                </p>
            </div>
        </li>
    )
}

export default SummaryCard