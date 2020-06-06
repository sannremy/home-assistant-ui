/**
 * Receive HA result (success or error)
 */
const receiveSuccessResult = (result) => {
  return dispatch => {
    for (let i = 0; i < result.length; i++) {
      // Weather
      if (result[i].entity_id === 'weather.openweathermap') {
        dispatch(updateWeather(result[i]))
      } else if (
        [
          // Switch plugs
          'switch.tv',
          'switch.camera',
        ].includes(result[i].entity_id)
      ) {
        dispatch(updateSwitchPlug(result[i]))
      } else if (
        [
          // Outdoor module
          'sensor.netatmo_backyard_temperature',
          'sensor.netatmo_backyard_humidity',
          'sensor.netatmo_backyard_radio',
          'sensor.netatmo_backyard_battery',
          'sensor.netatmo_backyard_battery_percent',
          'sensor.netatmo_backyard_min_temp',
          'sensor.netatmo_backyard_max_temp',
          'sensor.netatmo_backyard_reachability',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.netatmo_backyard_', '')
        dispatch(updateSensor(result[i], 'outdoor', metric))
      } else if (
        [
          // Anemometer
          'sensor.netatmo_anemometer_angle',
          'sensor.netatmo_anemometer_strength',
          'sensor.netatmo_anemometer_gust_angle',
          'sensor.netatmo_anemometer_gust_strength',
          'sensor.netatmo_anemometer_radio',
          'sensor.netatmo_anemometer_battery',
          'sensor.netatmo_anemometer_battery_percent',
          'sensor.netatmo_anemometer_reachability',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.netatmo_anemometer_', '')
        dispatch(updateSensor(result[i], 'anemometer', metric))
      }  else if (
        [
          // Rain gauge
          'sensor.netatmo_rain_gauge_rain',
          'sensor.netatmo_rain_gauge_sum_rain_24',
          'sensor.netatmo_rain_gauge_sum_rain_1',
          'sensor.netatmo_rain_gauge_radio',
          'sensor.netatmo_rain_gauge_battery',
          'sensor.netatmo_rain_gauge_battery_percent',
          'sensor.netatmo_rain_gauge_reachability',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.netatmo_rain_gauge_', '')
        dispatch(updateSensor(result[i], 'rainGauge', metric))
      }
    }
  }
}

const updateWeather = ({ state, attributes }) => ({
  type: 'UPDATE_WEATHER',
  state,
  attributes,
})

const updateSwitchPlug = ({ state, attributes, entity_id }) => ({
  type: 'UPDATE_SWITCH_PLUG',
  id: entity_id,
  state,
  attributes,
})

const updateSensor = ({ state }, moduleName, metric) => ({
  type: 'UPDATE_SENSOR',
  moduleName,
  metric,
  state,
})

const receiveErrorResult = (error) => ({
  type: 'RECEIVE_ERROR_RESULT',
  error,
})

export const receiveResult = (response) => {
  return dispatch => {
    if (response.success) {
      return dispatch(receiveSuccessResult(response.result))
    } else {
      return dispatch(receiveErrorResult(response.error))
    }
  }
}
