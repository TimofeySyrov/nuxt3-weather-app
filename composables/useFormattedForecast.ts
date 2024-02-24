export function useFormattedForecast(list: any) {
  const today = new Date()
  const selectedDate = ref(formatDate(today))
  const forecastDaysLimit = 3
  const forecast = computed(() => groupForecast(list.value.list))

  const threeDaysForecast = computed<{ [date: string]: IDailyForecast }>(() => {
    const result: { [date: string]: IDailyForecast } = {}
    for (let i = 0; i <= forecastDaysLimit; i++) {
      // Get the date for the next day
      const nextDay = new Date(today)
      nextDay.setDate(today.getDate() + i)
      const formattedDate = formatDate(nextDay)

      result[formattedDate] = formatDailyForecast(
        forecast.value[formattedDate],
        list.value.city.name
      ).filter((timestamp) => {
        const todayForecast = i === 0
        const middayForecast = timestamp.date.split(' ')[1] === '12:00:00'
        if (todayForecast || middayForecast) return timestamp
      })[0]
    }
    return result
  })

  const todayForecast = computed<IDailyForecast>(() => {
    return threeDaysForecast.value[selectedDate.value]
  })

  const updateSelectedDate = (date: string) => {
    selectedDate.value = date
  }

  return { todayForecast, threeDaysForecast, selectedDate, updateSelectedDate }
}
