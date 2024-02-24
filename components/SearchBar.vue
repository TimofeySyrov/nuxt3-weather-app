<template>
  <div class="bar" ref="barElementRef">
    <div class="input-wrapper">
      <input
        class="input"
        :class="{ expanded: showSuggestions }"
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        placeholder="Search city"
      />
      <div v-if="showSuggestions" class="suggestions">
        <ul>
          <li
            v-for="(suggestion, index) in suggestions?.results"
            :key="index"
            @click="selectSuggestion(suggestion)"
          >
            {{ suggestion.formatted }}
          </li>
          <li v-if="!suggestions?.results?.length">Not found.</li>
        </ul>
      </div>
    </div>
    <button class="btn" type="button" @click="handleBtnClick">Search</button>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const showSuggestions = ref(false)
const barElementRef = ref<any>(null)
const { setCoords } = useCoords()
const { data: suggestions, fetchData } = useFetchLocation()

const handleInput = debounce(() => {
  if (searchQuery.value.length === 0) {
    showSuggestions.value = false
    return
  }

  fetchData(searchQuery.value).finally(() => {
    showSuggestions.value = true
  })
}, 600)

function selectSuggestion(suggestion: any) {
  searchQuery.value = suggestion.formatted
  showSuggestions.value = false
  setCoords({
    lat: suggestion.lat,
    lon: suggestion.lon,
  })
}

function handleBtnClick() {
  if (searchQuery.value.length > 0 && !showSuggestions.value) {
    showSuggestions.value = true
  }
}

function handleOutsideClick(event: MouseEvent) {
  if (barElementRef.value && searchQuery.value.length > 0) {
    showSuggestions.value = barElementRef.value.contains(event.target)
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.bar {
  display: flex;
  position: relative;
}
.input-wrapper {
  position: relative;
}
.input {
  border: 1px solid white;
  background-color: white;
  padding: 10px 12px;
  color: #48484a;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  min-width: 409px;
  width: 100%;
  border-radius: 12px 0 0 12px;
  height: 40px;
  outline: none;
  font-size: 16px;
}
.expanded {
  border-color: #dfdfdf;
  border-bottom: transparent;
  border-radius: 12px 0 0 0;
}
.btn {
  background-color: #48484a;
  color: #f2f2f2;
  height: 40px;
  padding: 10px 12px;
  /* border: 1px solid #dfdfdf; */
  border-radius: 0 12px 12px 0;
  font-size: 16px;
  cursor: pointer;
}
.suggestions {
  position: absolute;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 0 0 12px 12px;
  border-top: none;
  width: 100%;
  top: 100%;
  left: 0;
}

.suggestions ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions ul li {
  padding: 10px;
  cursor: pointer;
}

.suggestions ul li:hover {
  background-color: #f0f0f0;
}
</style>
