import { sendMessage } from '../lib/ha-websocket-api'
import homeConfig from '../home-config.json'

const entities = homeConfig.entities

const sensorEntity = {}
for (let i = 0; i < entities.sensor.length; i++) {
  const sensor = entities.sensor[i];
  sensor.entities.map(entity => {
    sensorEntity[entity] = {...sensor}
  })
}

/**
 * Receive HA result (success or error)
 */
const receiveSuccessResult = (result) => {
  if (result === null) {
    return {
      type: 'RECEIVE_RESULT_NULL',
    }
  }

  return dispatch => {
    for (let i = 0; i < result.length; i++) {
      if (
        // Sensor
        result[i].entity_id.indexOf('sensor.') === 0
        && sensorEntity[result[i].entity_id]
      ) {
        const entityConfig = sensorEntity[result[i].entity_id]
        dispatch(updateSensor(result[i], entityConfig))
      } else if (
        // Weather
        result[i].entity_id.indexOf('weather.') === 0
        && entities.weather.includes(result[i].entity_id)
      ) {
        dispatch(updateWeather(result[i]))
      } else if (
        // Switch Plug
        result[i].entity_id.indexOf('switch.') === 0
        && entities.switchPlug.includes(result[i].entity_id)
      ) {
        dispatch(updateSwitchPlug(result[i]))
      } else if (
        // Climate
        result[i].entity_id.indexOf('climate.') === 0
        && entities.climate.includes(result[i].entity_id)
      ) {
        dispatch(updateClimate(result[i]))
      } else if (
        // Light
        result[i].entity_id.indexOf('light.') === 0
        && entities.light.includes(result[i].entity_id)
      ) {
        dispatch(updateLight(result[i]))
      } else if (
        // Timer
        result[i].entity_id.indexOf('timer.') === 0
        && entities.timer.includes(result[i].entity_id)
      ) {
        dispatch(updateTimer(result[i]))
      } else {
        // Not supported entities
        dispatch(updateNotSupported(result[i]))
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

const updateSensor = ({ state, attributes, entity_id }, entityConfig) => ({
  type: 'UPDATE_SENSOR',
  id: entity_id,
  state,
  attributes,
  entityConfig,
})

const updateLight = ({ state, attributes, entity_id }) => ({
  type: 'UPDATE_LIGHT',
  id: entity_id,
  state,
  attributes,
})

const updateClimate = ({ state, attributes, entity_id }) => ({
  type: 'UPDATE_CLIMATE',
  id: entity_id,
  state,
  attributes,
})

const updateTimer = ({ state, attributes, entity_id }) => ({
  type: 'UPDATE_TIMER',
  id: entity_id,
  state,
  attributes,
})

const updateNotSupported = ({ entity_id }) => {
  console.log('UPDATE_NOT_SUPPORTED:', entity_id)
  return {
    type: 'UPDATE_NOT_SUPPORTED',
    id: entity_id,
  }
}

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

export const receiveEvent = (response) => {
  return dispatch => {
    if (response.event.event_type === 'state_changed') {
      return dispatch(receiveStateChangedEvent(response.event))
    }
  }
}

const receiveStateChangedEvent = (stateChangedEvent) => {
  return dispatch => {
    dispatch(receiveSuccessResult([stateChangedEvent.data.new_state]))
  }
}

const callService = (message) => {
  let success = false

  try {
    sendMessage(message)
    success = true
  } catch (err) {
    console.log('Cannot call service, not connected or authenticated')
  }

  return {
    type: 'CALL_SERVICE',
    message,
    success,
  }
}

export const switchLight = ({ entity_id, enabled }) => {
  const message = {
    type: 'call_service',
    domain: 'light',
    service: enabled ? 'turn_on' : 'turn_off',
    service_data: {
      entity_id: entity_id,
    },
  }

  return callService(message)
}

export const switchPlug = ({ entity_id, enabled }) => {
  const message = {
    type: 'call_service',
    domain: 'switch',
    service: enabled ? 'turn_on' : 'turn_off',
    service_data: {
      entity_id: entity_id,
    },
  }

  return callService(message)
}

export const setThermostatTemperature = ({ entity_id, temperature }) => {
  const message = {
    type: 'call_service',
    domain: 'climate',
    service: 'set_temperature',
    service_data: {
      entity_id,
      temperature,
    },
  }

  return callService(message)
}

export const switchTimer = ({ entity_id, action }) => {

  const message = {
    type: 'call_service',
    domain: 'timer',
    service: action, // start, cancel
    service_data: {
      entity_id: entity_id,
    },
  }

  return callService(message)
}
