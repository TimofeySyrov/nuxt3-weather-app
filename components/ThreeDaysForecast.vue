<template>
  <section class="section">
    <h2 class="title">4-day forecast</h2>
    <ul class="forecast">
      <li
        v-for="(item, index) in weather"
        :key="index"
        :class="{
          active: selectedDate === index,
        }"
        @click="(e) => handleCardClick(e, `${index}`)"
      >
        <div class="weekday">{{ item.weekday }}</div>
        <img :src="getWeatherIcon(item.iconCode)" alt="weather icon" />
        <div>{{ item.temp }} °C</div>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
export default {
  props: {
    selectedDate: { type: String, required: true },
    weather: {
      type: Object as PropType<{ [date: string]: IDailyForecast }>,
      required: true,
    },
  },
  methods: {
    handleCardClick(event: MouseEvent, index: string) {
      this.$emit('forecast-select', index)
    },
  },
}
</script>
<style scoped>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.forecast {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.forecast li {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  padding: 15px;
}

.forecast li.active,
li:hover {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
</style>
