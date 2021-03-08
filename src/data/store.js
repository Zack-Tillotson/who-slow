const EMPTY_VALUE = {
  isLoading: false,
  isLoaded: false,
  isError: false,
  value: null,
  error: null,
}

class Store {
  constructor() {
    this.sources = []
    this.data = {} // key = dataName, value = array of values matching sources
    this.dataRequests = {} // key = dataName, value = request objects
  }

  initialize(sources) {
    if(!sources) throw new Error('Must initialize with array of sources')
    this.sources = sources
  }

  get(dataName) {
    const values = this.data[dataName];

    if(!values) {
      return EMPTY_VALUE
    }

    return values[0] // Just take the first item (more is yagni atm)
  }

  watch(dataName) {
    this.sources.forEach(source => {
      const key = source.id + dataName
      if(!this.dataRequests[key]) this.dataRequests[key] = source.request(dataName, this.dataHandler.bind(this))
    })
  }

  dispose(dataName) {
    this.sources.forEach(source => {
      const key = source.id + dataName
      const dataRequest = this.dataRequests[key]
      if(!dataRequest) return
      dataRequest.dispose()
    })
  }

  dataHandler(dataName, sourceId, value) {
    this.data[dataName] = this.sources.map(source => source.id === sourceId ? value : null)
  }
}

export default Store