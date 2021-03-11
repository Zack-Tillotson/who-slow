import types from './types';

const createAction = (type) => (payload) => ({type, payload})

export default {
  foo: createAction(types.foo), // example
}