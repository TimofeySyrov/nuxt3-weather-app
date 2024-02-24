interface IAPIResponse {
  results: Array<{
    lon: number
    lat: number
    formatted: string
  }>
}

export default function useFetchLocation() {
  const config = useRuntimeConfig()
  const data = ref<IAPIResponse | null>(null)
  let pending = ref(false)

  async function fetchData(query: string) {
    pending.value = true
    try {
      const response = await fetch(
        config.public.GEOAPIFY_API_URL +
          `?text=${query}` +
          `&format=json&apiKey=${config.public.GEOAPIFY_API_KEY}`
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
