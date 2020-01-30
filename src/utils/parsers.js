export function parseInt(value) {
  return value ? Number.parseInt(value, 10) : null
}

export function parseDecimalNumber(value) {
  return String(value || '').replace(/,/, '.')
}

export function formatDecimalNumber(value) {
  return String(value || '').replace(/\./, ',')
}

export function trim(value) {
  return value.trim()
}
