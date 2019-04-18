import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAQq7jmgYXkecQNg9E2pRP5P4wHu35Vw3M',
  authDomain: 'trackerdash-9b5fa.firebaseapp.com',
  databaseURL: 'https://trackerdash-9b5fa.firebaseio.com',
  projectId: 'trackerdash-9b5fa',
  storageBucket: 'trackerdash-9b5fa.appspot.com',
  messagingSenderId: '766975116502'
}
const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()

export default db
