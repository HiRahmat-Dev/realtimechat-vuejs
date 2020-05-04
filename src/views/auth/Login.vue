<template>
  <div class="login">
    <div class="btn-login" @click="login">
      <img src="@/assets/img/svg/chat-doang.svg">
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'

export default {
  name: 'Login',
  methods: {
    login () {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          // this.$router.push('/chat')
        })
        .catch(error => {
        // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          vm.$router.push('/chat')
        } else {
          next()
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
}
.btn-login {
  width: 300px;
  margin: 100px auto 0;
  padding: 16px 25px;
  font-size: 20px;
  cursor: pointer;
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
