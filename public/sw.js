import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js'
import { getAuth, onAuthStateChanged, getIdToken } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js'

const getOriginFromUrl = (url) => {
  // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
  const pathArray = url.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  return protocol + '//' + host;
};

const getBodyContent = (req) => {
  return Promise.resolve().then(() => {
    if (req.method !== 'GET') {
      if (req.headers.get('Content-Type').indexOf('json') !== -1) {
        return req.json()
          .then((json) => {
            return JSON.stringify(json);
          });
      } else {
        return req.text();
      }
    }
  }).catch((error) => {
    // Ignore error.
  });
};

const getConfigFromIndexDb = async () => {
  const db = await openDB('WhoSlowAppConfig', 1)
  const value = await db.get('WhoSlowAppConfig', 'firebase')
  return value
}

// Initialize the Firebase app in the service worker script.
const getIdTokenPromise = (config) => {
  return new Promise((resolve, reject) => {
    const app = initializeApp(config)
    const auth = getAuth(app)
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        getIdToken(user).then((idToken) => {
          resolve(idToken);
        }, (error) => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  });
};

self.addEventListener('fetch', (event) => {

  const requestProcessor = (idToken) => {
    let req = event.request;
    let processRequestPromise = Promise.resolve();
    // For same origin https requests, append idToken to header.
    if (self.location.origin == getOriginFromUrl(event.request.url) &&
        (self.location.protocol == 'https:' ||
         self.location.hostname == 'localhost') &&
        idToken) {
      // Clone headers as request headers are immutable.
      const headers = new Headers();
      req.headers.forEach((val, key) => {
        headers.append(key, val);
      });
      // Add ID token to header.
      headers.append('Authorization', 'Bearer ' + idToken);
      processRequestPromise = getBodyContent(req).then((body) => {
        try {
          req = new Request(req.url, {
            method: req.method,
            headers: headers,
            mode: 'same-origin',
            credentials: req.credentials,
            cache: req.cache,
            redirect: req.redirect,
            referrer: req.referrer,
            body,
            // bodyUsed: req.bodyUsed,
            // context: req.context
          });
        } catch (e) {
          // This will fail for CORS requests. We just continue with the
          // fetch caching logic below and do not pass the ID token.
        }
      });
    }
    return processRequestPromise.then(() => {
      return fetch(req);
    });
  };
  // Fetch the resource after checking for the ID token.
  // This can also be integrated with existing logic to serve cached files
  // in offline mode.
  event.respondWith(getConfigFromIndexDb().then(getIdTokenPromise).then(requestProcessor, requestProcessor));
});
