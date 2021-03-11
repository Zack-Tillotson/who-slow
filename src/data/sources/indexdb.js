const id = 'index-db';

function request(name, onData) {

  const value = null;

  const result = {
    isLoaded: true,
    isLoading: false,
    isError: false,
    value,
    error: null,
  }

  onData(name, id, result)

  return {
    ...result,
    dispose: () => {},
  }
}

export default {
  id,
  request,
}