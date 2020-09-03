const locale = process.env.locale
const timeZone = process.env.timeZone

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
  formatedName = formatedName.replace('Tgv', 'TGV')

  return formatedName
};
