const locale = process.env.locale
const timeZone = process.env.timeZone
const temperatureUnit = process.env.temperatureUnit

export const formatDateTime = (date, options = {}) => {
  options.timeZone = timeZone
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export const formatSecondsToHHMMSS = (seconds) => {
  const date = new Date(0)
  date.setSeconds(seconds)
  return date.toISOString().substr(11, 8)
}

export const formatNumber = (number, options = {}) => {
  return new Intl.NumberFormat(locale, options).format(number)
}

export const formatTemperature = (value, toFixed = 0) => {
  let temp = Number.parseFloat(value).toFixed(toFixed);
  return `${formatNumber(temp, {
    minimumFractionDigits: toFixed,
  })}°${temperatureUnit === 'celsius' ? 'C' : 'F'}`
}

export const formatTrainStationName = (name) => {
  let formatedName = name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-')

  // Special cases
  formatedName = formatedName
    .replace('Tgv', 'TGV')
    .replace(' De ', ' de ')

  return formatedName
};

export const formatClimatePresetMode = (mode) => {
  const modes = {
    "away": "Absent",
    "boost": "Boost",
    "Frost Guard": "Anti-gel",
    "Schedule": "Programme",
  }

  return modes[mode]
}
