import {useState, useEffect} from 'react';
import data from './index';

function useData(dataName) {
  const [value, updateValue] = useState(data.get(dataName));

  useEffect(() => {
    data.watch(dataName, updateValue)

    return () => {
      data.dispose(dataName)
    }
  }, [dataName])

  return value
}

export default useData