interface IGroupForecast {
  [date: string]: Array<IAPIWeather>
}

export default function groupForecast(list: TWeatherList) {
  const forecastByDate: IGroupForecast = {}

  list?.forEach((timestamp) => {
    // Extract the date key from the timestamp item
    const dateKey = timestamp.dt_txt.split(' ')[0]

    if (!(dateKey in forecastByDate)) {
      forecastByDate[dateKey] = []
    }

    // Push the item to the array corresponding to its date key
    forecastByDate[dateKey].push(timestamp)
  })

  return forecastByDate
}
