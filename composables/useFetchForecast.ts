interface IParams {
  position: any
  weatherUnits: TWeatherUnits
}

export function useFetchForecast() {
  const config = useRuntimeConfig()
  const data = ref(null)
  let pending = ref(false)

  async function fetchData({ position, weatherUnits }: IParams) {
    pending.value = true
    try {
      const response = await fetch(
        config.public.OPENWEATHERMAP_API_URL +
          `?lat=${position.lat}&lon=${position.lon}` +
          `&appid=${config.public.OPENWEATHERMAP_API_KEY}` +
          `&units=${weatherUnits}`
      ).finally(() => {
        pending.value = false
      })

      if (!response.ok) throw new Error('Network response was not ok')
      data.value = await response.json()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { data, pending, fetchData }
}
