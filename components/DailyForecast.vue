<template>
  <div class="card">
    <div class="location">
      <div class="date">
        {{ formatDate(new Date(weather.date)) }}
      </div>
      <div class="city">{{ weather.city }}</div>
    </div>

    <div class="temp">
      <img :src="getWeatherIcon(weather.iconCode)" alt="weather icon" />
      <div>{{ weather.temp }}°C</div>
    </div>
    <div class="other">
      <div>Humidity: {{ weather.humidity }}%</div>
      <div>Wind: {{ weather.wind }} km/h</div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    weather: { type: Object as PropType<IDailyForecast>, required: true },
  },
  methods: {
    formatDate(date: Date) {
      // Format the date part (Month, Day)
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
      })
      const dateFormatted = dateFormatter.format(date)

      // Format the time part (Hours, Minutes, AM/PM)
      let hours = date.getHours()
      const minutes = ('0' + date.getMinutes()).slice(-2) // Add leading zero if minutes is a single digit
      const period = hours >= 12 ? 'pm' : 'am' // Determine AM/PM
      hours = hours % 12 || 12 // Convert to 12-hour format
      const timeFormatted = `${hours}:${minutes}${period}`

      // Combine date and time parts
      return `${dateFormatted}, ${timeFormatted}`
    },
  },
}
</script>
<style scoped>
.card {
  min-width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

.date {
  font-size: 14px;
  color: #eb6e4b;
}
.city {
  font-size: 25px;
  color: #48484a;
  font-weight: 700;
}

.temp {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 54px;
  color: #48484a;
  padding: 30px 0;
  gap: 10px;
}

.other {
  padding: 10px 0 10px 20px;
  border-left: 1px solid #eb6e4b;
}

.location,
.other {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
