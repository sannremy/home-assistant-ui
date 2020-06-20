const locale = process.env.locale || 'fr-FR'
const timeZone = process.env.timeZone || 'Europe/Paris'

export const formatDateTime = (date, options = {}) => {
  options.timeZone = timeZone
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export const formatTemperature = (value, raw = false) => {
  let temp = value
  if (!raw) {
    temp = Math.round(temp)
  }

  return `${temp}°`
}
