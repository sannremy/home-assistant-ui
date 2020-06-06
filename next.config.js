module.exports = {
  env: {
    haWebsocketAPI: process.env.HA_WEBSOCKET_API,
    haAccessToken: process.env.HA_ACCESS_TOKEN,
    locale: process.env.LOCALE,
    timeZone: process.env.TIME_ZONE,
    temperatureUnit: process.env.TEMPERATURE_UNIT,
  },
  poweredByHeader: false,
}
