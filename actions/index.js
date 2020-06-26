import { dispatch } from "../lib/store"

/**
 * Receive HA result (success or error)
 */
const receiveSuccessResult = (result) => {
  return dispatch => {
    for (let i = 0; i < result.length; i++) {
      // Weather
      if (
        result[i].entity_id === 'weather.meteofrance'
      ) {
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
      } else if (
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
      } else if (
        [
          // Living room module
          'sensor.netatmo_living_room_temperature',
          'sensor.netatmo_living_room_co2',
          'sensor.netatmo_living_room_humidity',
          'sensor.netatmo_living_room_noise',
          'sensor.netatmo_living_room_pressure',
          'sensor.netatmo_living_room_wifi',
          'sensor.netatmo_living_room_min_temp',
          'sensor.netatmo_living_room_max_temp',
          'sensor.netatmo_living_room_reachability',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.netatmo_living_room_', '')
        dispatch(updateSensor(result[i], 'livingRoom', metric))
      } else if (
        [
          // Master bedroom module
          'sensor.netatmo_master_bedroom_temperature',
          'sensor.netatmo_master_bedroom_co2',
          'sensor.netatmo_master_bedroom_humidity',
          'sensor.netatmo_master_bedroom_radio',
          'sensor.netatmo_master_bedroom_battery',
          'sensor.netatmo_master_bedroom_battery_percent',
          'sensor.netatmo_master_bedroom_min_temp',
          'sensor.netatmo_master_bedroom_max_temp',
          'sensor.netatmo_master_bedroom_reachability',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.netatmo_master_bedroom_', '')
        dispatch(updateSensor(result[i], 'masterBedroom', metric))
      } else if (
        [
          // Bedroom 1 module
          'sensor.netatmo_bedroom1_temperature',
          'sensor.netatmo_bedroom1_co2',
          'sensor.netatmo_bedroom1_humidity',
          'sensor.netatmo_bedroom1_radio',
          'sensor.netatmo_bedroom1_battery',
          'sensor.netatmo_bedroom1_battery_percent',
          'sensor.netatmo_bedroom1_min_temp',
          'sensor.netatmo_bedroom1_max_temp',
          'sensor.netatmo_bedroom1_reachability',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.netatmo_bedroom1_', '')
        dispatch(updateSensor(result[i], 'bedroom1', metric))
      } else if (
        [
          // Attic module
          'sensor.netatmo_attic_temperature',
          'sensor.netatmo_attic_co2',
          'sensor.netatmo_attic_humidity',
          'sensor.netatmo_attic_radio',
          'sensor.netatmo_attic_battery',
          'sensor.netatmo_attic_battery_percent',
          'sensor.netatmo_attic_min_temp',
          'sensor.netatmo_attic_max_temp',
          'sensor.netatmo_attic_reachability',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.netatmo_attic_', '')
        dispatch(updateSensor(result[i], 'attic', metric))
      } else if (
        result[i].entity_id === 'climate.netatmo_home'
      ) {
        dispatch(updateClimate(result[i]))
      } else if (
        [
          // Weather meteofrance
          'sensor.weather_meteofrance_rain_chance',
          'sensor.weather_meteofrance_freeze_chance',
          'sensor.weather_meteofrance_thunder_chance',
          'sensor.weather_meteofrance_snow_chance',
          'sensor.weather_meteofrance_weather',
          'sensor.weather_meteofrance_wind_speed',
          'sensor.weather_meteofrance_next_rain',
          'sensor.weather_meteofrance_temperature',
          'sensor.weather_meteofrance_uv',
          'sensor.weather_meteofrance_weather_alert',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.weather_meteofrance_', '')
        dispatch(updateSensor(result[i], 'meteofrance', metric))
      } else if (
        [
          // Travel times
          'sensor.google_travel_time_destination_1',
          'sensor.google_travel_time_destination_2',
          'sensor.google_travel_time_destination_3',
        ].includes(result[i].entity_id)
      ) {
        const metric = result[i].entity_id.replace('sensor.google_travel_time_', '')
        dispatch(updateSensor(result[i], 'googleTravelTime', metric))
      } else if (
        [
          // Light Philips Hue
          'light.shelf_living_room',
          'light.windows_living_room',
          'light.master_bedroom',
        ].includes(result[i].entity_id)
      ) {
        dispatch(updateLight(result[i]))
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

const updateSensor = ({ state, attributes }, moduleName, metric) => ({
  type: 'UPDATE_SENSOR',
  moduleName,
  metric,
  state,
  attributes,
})

const updateLight = ({ state, attributes, entity_id }) => ({
  type: 'UPDATE_LIGHT',
  id: entity_id,
  state,
  attributes,
})

const updateClimate = ({ state, attributes }) => ({
  type: 'UPDATE_CLIMATE',
  state,
  attributes,
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

export const switchLight = ({ entity_id, enabled }) => {
  console.log('switchLight')
  return {
    type: 'CALL_SERVICE',
    domain: 'light',
    service: enabled ? 'turn_on' : 'turn_off', // check service
    entity_id,
  }
}

export const switchPlug = ({ entity_id, enabled }) => {
  console.log('switchPlug')
  return {
    type: 'CALL_SERVICE',
    domain: 'switch',
    service: enabled ? 'turn_on' : 'turn_off', // check service
    entity_id,
  }
}

export const changeThermostat = ({ entity_id, temperature }) => {
  console.log('changeThermostat')
  return {
    type: 'CALL_SERVICE',
    domain: 'climate',
    service: temperature, // check service
    entity_id,
  }
}
