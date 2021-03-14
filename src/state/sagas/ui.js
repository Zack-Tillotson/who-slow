
import {takeEvery, put} from 'redux-saga/effects'
import types from '../types'
import actions from '../actions'

function* handleReqiestNewSession(action) {
  // TODO create new session
  // TODO navigate to new session
}

function* monitorRequests(action) {
  yield takeEvery(types.uiRequestNewSession, handleReqiestNewSession)  
}

export default [monitorRequests]