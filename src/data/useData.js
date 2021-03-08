import {useEffect} from 'react';
import data from './index';

function useData(dataName) {

  useEffect(() => {
    data.watch(dataName);

    return () => {
      data.dispose(dataName);
    }
  }, [dataName]);

  return data.get(dataName);
}

export default useData