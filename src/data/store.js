import hardcodedSource from './sources/hardcoded'

const EMPTY_VALUE = {
  isLoading: false,
  isLoaded: false,
  isError: false,
  value: null,
  error: null,
}

const INITIAL_DATA = {
  games: [],
  players: [],
  sessions: [],
}

const sources = [hardcodedSource]

class Store {
  constructor() {
    this.data = INITIAL_DATA
    
    this.watch = this.watch.bind(this)
    this.dataHandler = this.dataHandler.bind(this)

    this.initialize();
  }

  initialize(targets = Object.keys(INITIAL_DATA)) {
    return Promise.all(targets.map(this.watch))
  }

  get(dataName) {
    if(Object.keys(this.data).indexOf(dataName) === -1) {
      return EMPTY_VALUE
    }

    return this.data[dataName]
  }

  watch(dataName, onData) {
    return Promise.all(sources.map(source => source.request(dataName, this.dataHandler)))
      .then(() => typeof onData === 'function' && onData(this.get(dataName)))
  }

  dispose(dataName) {
    return Promise.resolve(); // TODO
  }

  dataHandler(dataName, sourceId, value) {
    this.data[dataName] = value;
  }


}

export default Store