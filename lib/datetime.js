const locale = process.env.locale
const timeZone = process.env.timeZone

export const formatDateTime = (date, options = {}) => {
  options.timeZone = timeZone
  return new Intl.DateTimeFormat(locale, options).format(date)
}
