import { dispatch } from './store'
import { receiveEntities } from '../actions'

import {
  Auth,
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
  callService as _callService,
} from 'home-assistant-js-websocket'

export const callService = _callService

export let connection

export const init = async () => {
  const auth = createLongLivedTokenAuth(
    process.env.haUrl,
    process.env.haAccessToken
  );

  connection = await createConnection({ auth });
  subscribeEntities(connection, (entities) => {
    dispatch(receiveEntities(entities))
  })
}
