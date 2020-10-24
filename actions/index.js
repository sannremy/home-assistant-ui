import { connection, callService } from '../lib/ha-websocket-api'
import homeConfig from '../home-config.json'

const configEntities = homeConfig.entities

const sensorEntity = {}
for (let i = 0; i < configEntities.sensor.length; i++) {
  const sensor = configEntities.sensor[i];
  sensor.entities.map(entity => {
    sensorEntity[entity] = {...sensor}
  })
}

/**
 * Receive HA result (success or error)
 */
export const receiveEntities = (entities) => {
  return dispatch => {
    for (const entityId in entities) {
      if (entities.hasOwnProperty(entityId)) {
        const entity = entities[entityId];
        if (
          // Sensor
          entityId.indexOf('sensor.') === 0
          && sensorEntity[entityId]
        ) {
          const entityConfig = sensorEntity[entityId]
          dispatch(updateSensor(entity, entityConfig))
        } else if (
          // Weather
          entityId.indexOf('weather.') === 0
          && configEntities.weather.includes(entityId)
        ) {
          dispatch(updateWeather(entity))
        } else if (
          // Switch Plug
          entityId.indexOf('switch.') === 0
          && configEntities.switchPlug.includes(entityId)
        ) {
          dispatch(updateSwitchPlug(entity))
        } else if (
          // Climate
          entityId.indexOf('climate.') === 0
          && configEntities.climate.includes(entityId)
        ) {
          dispatch(updateClimate(entity))
        } else if (
          // Light
          entityId.indexOf('light.') === 0
          && configEntities.light.includes(entityId)
        ) {
          dispatch(updateLight(entity))
        } else if (
          // Timer
          entityId.indexOf('timer.') === 0
          && configEntities.timer.includes(entityId)
        ) {
          dispatch(updateTimer(entity))
        } else {
          // Not supported in config entities
          dispatch(updateNotSupported(entity))
        }
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
  console.info('UPDATE_NOT_SUPPORTED:', entity_id)
  return {
    type: 'UPDATE_NOT_SUPPORTED',
    id: entity_id,
  }
}

export const changeView = ({ view }) => ({
  type: 'CHANGE_VIEW',
  view,
})

/**
 * Call services
 */

const _callService = (message) => {
  let success = true

  try {
    callService(connection, message.domain, message.service, message.service_data)
  } catch (err) {
    success = false
  }

  return {
    type: 'CALL_SERVICE',
    message,
    success,
  }
}

export const switchLight = ({ entity_id, enabled }) => {
  const message = {
    domain: 'light',
    service: enabled ? 'turn_on' : 'turn_off',
    service_data: {
      entity_id,
    },
  }

  return _callService(message)
}

export const switchPlug = ({ entity_id, enabled }) => {
  const message = {
    domain: 'switch',
    service: enabled ? 'turn_on' : 'turn_off',
    service_data: {
      entity_id,
    },
  }

  return _callService(message)
}

export const setThermostatTemperature = ({ entity_id, temperature }) => {
  const message = {
    domain: 'climate',
    service: 'set_temperature',
    service_data: {
      entity_id,
      temperature,
    },
  }

  return _callService(message)
}

export const switchTimer = ({ entity_id, action }) => {

  const message = {
    domain: 'timer',
    service: action, // start, cancel
    service_data: {
      entity_id: entity_id,
    },
  }

  return _callService(message)
}
