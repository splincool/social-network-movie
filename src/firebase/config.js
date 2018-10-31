import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBn2nxRkorKZ1-a7GWUczlo9bE_LXnyeG0',
  authDomain: 'social-network-movie.firebaseapp.com',
  databaseURL: 'https://social-network-movie.firebaseio.com',
  projectId: 'social-network-movie',
  storageBucket: 'social-network-movie.appspot.com',
  messagingSenderId: '511734310402'
}
firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
const usersCollection = db.collection('users')
const storageRef = firebase.storage().ref()

export default {
  db,
  auth,
  currentUser,
  usersCollection,
  storageRef
}
