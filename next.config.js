const isProd = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd,
    subdomainPrefix: '/local',
  },
  assetPrefix: isProd ? '/local' : '',
  basePath: isProd ? '/local' : '',
  trailingSlash: true,
  env: {
    haUrl: process.env.HA_URL,
    haAccessToken: process.env.HA_ACCESS_TOKEN,
    locale: process.env.LOCALE,
    timeZone: process.env.TIME_ZONE,
    temperatureUnit: process.env.TEMPERATURE_UNIT,
  },
  poweredByHeader: false,
})
