<template>
  <Header />
  <div class="app">
    <div v-if="!data">Loading...</div>
    <DailyForecast v-if="data" :weather="todayForecast" />
    <ThreeDaysForecast
      v-if="data"
      :selectedDate="selectedDate"
      @forecast-select="updateSelectedDate"
      :weather="threeDaysForecast"
    />
  </div>
</template>

<script setup lang="ts">
const { coords } = useCoords()
const { data, fetchData } = useFetchForecast()
const { todayForecast, threeDaysForecast, selectedDate, updateSelectedDate } =
  useFormattedForecast(data)

function fetchForecast(coords: ICoords) {
  fetchData({ position: coords, weatherUnits: 'metric' })
}

onMounted(() => {
  const defaultCoords = { lat: 51.509865, lon: -0.118092 } // London coords as default position

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      fetchForecast({ lat: coords.latitude, lon: coords.longitude })
    },
    () => {
      fetchForecast(defaultCoords)
    }
  )
})

// Refetch forecast for new location request
watch(
  () => coords,
  (newValue) => {
    coords.value && fetchForecast(newValue.value!)
  },
  { deep: true, immediate: true }
)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
.app {
  background: #ffffff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
.title {
  font-size: 18px;
  color: #48484a;
}
</style>
