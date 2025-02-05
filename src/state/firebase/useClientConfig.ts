import { useEffect } from 'react'
import { openDB } from 'idb';

import {config} from './firebase.config'

const LOCAL_DB = 'WhoSlowAppConfig'
const CONFIG_KEY = 'firebase'

export default function useClientConfig() {
  useEffect(() => {
    (async () => {
      const db = await openDB<typeof config>(LOCAL_DB, 1, {
        upgrade(db) {
          db.createObjectStore(LOCAL_DB, {autoIncrement: true})
        },
      })
      db.put(LOCAL_DB, config, CONFIG_KEY)
    })()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', {scope: '/', type: 'module'});
    }
  }, [])
}