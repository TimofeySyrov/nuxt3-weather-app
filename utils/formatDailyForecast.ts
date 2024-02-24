export default function formatDailyForecast(
  forecast: IAPIWeather[],
  city: string
): IDailyForecast[] {
  return forecast.map((timestamp) => ({
    city,
    date: timestamp.dt_txt,
    weekday: new Date(timestamp.dt_txt).toLocaleDateString('en-US', {
      weekday: 'long',
    }),
    iconCode: timestamp.weather[0].icon,
    temp: Math.round(timestamp.main.temp),
    humidity: timestamp.main.humidity,
    wind: timestamp.wind.speed,
  }))
}
