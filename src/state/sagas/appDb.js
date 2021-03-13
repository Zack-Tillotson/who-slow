import {takeEvery, put} from 'redux-saga/effects'
import types from '../types'
import actions from '../actions'

import indexdb from '../indexdb'

function* initAppDb(action) {
  const dbData = yield indexdb.initialize();
  yield put(actions.dbDataLoaded(dbData))
}

export default [initAppDb]