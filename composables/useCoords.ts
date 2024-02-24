export default function useCoords() {
  const coords = useState<ICoords | null>('coords', () => null)

  const setCoords = (newCoords: ICoords) => {
    coords.value = newCoords
  }

  return {
    coords,
    setCoords,
  }
}
