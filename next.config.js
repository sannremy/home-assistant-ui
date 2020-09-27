const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? '/local' : '',
  basePath: isProd ? '/local' : '',
  exportTrailingSlash: true,
  env: {
    haWebsocketAPI: process.env.HA_WEBSOCKET_API,
    haAccessToken: process.env.HA_ACCESS_TOKEN,
    locale: process.env.LOCALE,
    timeZone: process.env.TIME_ZONE,
    temperatureUnit: process.env.TEMPERATURE_UNIT,
  },
  poweredByHeader: false,
}
