import {takeEvery, call, put, delay} from 'redux-saga/effects'
import types from '../types'
import actions from '../actions'

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

export default [initAppDb]