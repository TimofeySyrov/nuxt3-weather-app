export default function formatDate(date: Date | string) {
  const currentDate = new Date(date)
  const year = currentDate.getFullYear()
  // Month is zero-based, so we add 1 to it
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  // Format the date as YYYY-MM-DD
  return `${year}-${month}-${day}`
}
