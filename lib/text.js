const locale = process.env.locale || 'fr-FR'
const timeZone = process.env.timeZone || 'Europe/Paris'

export const formatDateTime = (date, options = {}) => {
  options.timeZone = timeZone
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export const formatNumber = (number, options = {}) => {
  return new Intl.NumberFormat(locale, options).format(number)
}

export const formatTemperature = (value, toFixed = 0) => {
  let temp = Number.parseFloat(value).toFixed(toFixed);
  return `${formatNumber(temp, {
    minimumFractionDigits: toFixed,
  })}°`
}
