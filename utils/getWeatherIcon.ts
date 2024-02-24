export default function getWeatherIcon(iconCode: string) {
  const config = useRuntimeConfig()

  return `${config.public.OPENWEATHERMAP_ICON_URL}${iconCode}@2x.png`
}
