import Store from './store';
import hardcodedSource from './sources/hardcoded'

const store = new Store();

function initialize() {
  store.initialize([
    hardcodedSource,
  ])
}

export default store;