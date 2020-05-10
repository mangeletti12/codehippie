export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBB6L1pogP0o8hn7W3faYqUd2Snk1R7BO4",
    authDomain: "answers-69d1c.firebaseapp.com",
    databaseURL: "https://answers-69d1c.firebaseio.com",
    projectId: "answers-69d1c",
    storageBucket: "answers-69d1c.appspot.com",
    messagingSenderId: "782522297888"
  },
  auth: {
    clientID: 'YOUR-AUTH0-CLIENT-ID',
    domain: 'YOUR-AUTH0-DOMAIN', // e.g., you.auth0.com
    audience: 'YOUR-AUTH0-API-IDENTIFIER', // e.g., http://localhost:3001
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  },

};
