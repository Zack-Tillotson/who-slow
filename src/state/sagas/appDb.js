import {takeEvery, call, put, delay, select} from 'redux-saga/effects'
import types from '../types'
import actions from '../actions'
import {pathSelector} from '../useState'

import indexdb from '../indexdb'

function* initAppDb(action) {
  //yield delay(750)
  const data = yield indexdb.initialize();
  yield put(actions.dbDataLoaded({data, path: 'initialize'}))
}

export function* loadObject(objectName, params) {
  const data = yield call(indexdb.getObject, objectName, params)
  yield put(actions.dbDataLoaded({data, path: objectName, params}))
  return data
}

function* handleStateValueUpdated(action) {
  const {path, value} = action.payload
  if(path.startsWith('session/')) {
    const {events, game, players} = yield select(pathSelector('session')) // Is updated state
    const id = Number(window.location.href.split('/').slice(-2, -1)[0])
    yield call(indexdb.createObject, 'sessions', {id, events, game, players})
  }
}

function* monitorState(action) {
  yield takeEvery(types.stateValueUpdated, handleStateValueUpdated)
}

export default [initAppDb, monitorState]