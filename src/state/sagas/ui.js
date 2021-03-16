import {takeEvery, put, call, select} from 'redux-saga/effects'
import types from '../types'
import actions from '../actions'
import indexdb from '../indexdb'
import {pathSelector} from '../useState'
import {loadObject} from './appDb'

function* handleRequestNewSession(action) {
  const game = (yield select(pathSelector('sessionConfig/games')))[0].id
  const players = (yield select(pathSelector('sessionConfig/players'))).map(player => player.id)

  const sessionId = yield call(indexdb.createObject, 'sessions', {game, players})

  window.location = `/app/session/${sessionId}/`
}

function* handleRequestLoadSession(action) {
  yield loadObject('sessions', {id: action.payload.sessionId})
}

function* monitorRequests(action) {
  yield takeEvery(types.uiRequestNewSession, handleRequestNewSession)
  yield takeEvery(types.uiRequestLoadSession, handleRequestLoadSession)
}

export default [monitorRequests]