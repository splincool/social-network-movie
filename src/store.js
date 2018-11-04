import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    photoURL: null,
    progress: null,
    progressShow: false,
    movies: null
  },
  getters: {
    user (state) {
      return state.user
    },
    movies (state) {
      return state.movies
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    photoURL (state) {
      return state.photoURL
    },
    progress (state) {
      return state.progress
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setMovies (state, payload) {
      state.movies = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setURLPhoto (state, payload) {
      state.photoURL = payload
    },
    setProgress (state, payload) {
      state.progress = payload
    },
    setProgressShow (state, payload) {
      state.progressShow = payload
    }
  },
  actions: {
    // authorization
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            firebase.auth().currentUser.updateProfile({
              displayName: payload.displayName
            }).then(() => {
              console.log('successful')
              window.location.reload()
            })
            const newUser = {
              id: user.uid,
              email: user.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
      commit('setLoading', false)
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email
            }
            commit('setUser', newUser)
            window.location.reload()
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGoogle ({ commit }) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL
      })
      commit('setLoading', false)
    },
    logout (context) {
      firebase.auth().signOut()
      context.commit('setUser', null)
      window.location.reload()
    },
    // update profile
    updateProfile ({ commit, state }, user) {
      commit('setLoading', true)
      if (firebase.auth().currentUser) {
        if (user.photoURL !== null && user.photoURL !== undefined) {
          this.dispatch('uploadFileFirebase', [user, state.user.id, 'Avatar'])
        } else {
          firebase.auth().currentUser.updateProfile({
            displayName: user.displayName
          }).then(() => {
            // Update successful
            console.log('successful')
            window.location.reload()
          })
            .catch(
              error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              }
            )
        }
      }
      commit('setLoading', false)
    },
    // reset Password With Email
    resetPasswordWithEmail ({ commit }, payload) {
      const { email } = payload
      commit('setLoading', true)
      firebase.auth().sendPasswordResetEmail(email)
        .then(
          () => {
            commit('setLoading', false)
            console.log('Email Sent')
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
    },
    // upload file to Firebase
    uploadFileFirebase ({ commit, state }, [file, userID, fileName]) {
      // Нужно добавить сжатие картинок
      // Create a root reference
      var storageRef = firebase.storage().ref()
      var metadata = {
        contentType: 'image/jpeg/png'
      }
      var uploadTask = storageRef.child(userID + '/' + fileName)
      var uploadFile = uploadTask.put(file.photoURL, metadata)
      uploadFile.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        commit('setProgress', progress)
        commit('setProgressShow', true)
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      })
      return uploadFile.then(() => {
        return uploadTask.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          commit('setURLPhoto', downloadURL)
          return firebase.auth().currentUser.updateProfile({
            photoURL: downloadURL,
            displayName: state.user.name
          }).then(() => {
            // Update successful
            console.log('successful')
            commit('setProgressShow', false)
            window.location.reload()
          })
            .catch(
              error => {
                commit('setLoading', false)
                commit('setError', error)
                commit('setProgressShow', false)
                console.log(error)
              }
            )
        })
      })
    },
    getMovies ({ commit }, link) {
      return axios.get(`http://api.tvmaze.com/` + link).then(response => {
        console.log(response)
        commit('setMovies', response.data)
      })
        .catch(e => {
          console.log(e)
          commit('setError', e)
        })
    }
  }
})
