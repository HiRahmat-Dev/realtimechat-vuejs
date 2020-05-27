<template>
  <div class="login">
    <form class="form-login" @submit.prevent="cek">
      <div class="logo">
        <img src="@/assets/img/svg/chat-doang.svg">
      </div>
      <div class="grup-form">
        <input type="text" placeholder="Email">
      </div>
      <div class="grup-form">
        <input type="text" placeholder="Password">
      </div>
      <button class="btn btn-primary">Login</button>
      <router-link class="btn btn-secondary" to="/register">Signin</router-link>
      <p class="text-center">atau</p>
      <div id="customBtn" @click="login" class="customGPlusSignIn">
        <img src="@/assets/img/g-normal.png" class="icon"/>
        <span class="buttonText">Signin with Google</span>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'

export default {
  name: 'Login',
  methods: {
    cek () {
      alert('Berhasil')
    },
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
.logo {
  width: 200px;
  margin: 0 auto 10px;
  font-size: 20px;
  img {
    width: 100%;
    object-fit: cover;
  }
}
form.form-login {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.075);
  width: 400px;
  margin: 100px auto 0;
  padding: 20px;
  border-radius: 10px;
  input {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid rgb(197, 197, 197);
  }
  .btn {
    display: block;
    width: 100%;
    text-align: center;
    text-decoration: none;
    color: black;
    font-size: 18px;
    padding: 10px;
    outline: none;
    border: 1px solid black;
    cursor: pointer;
  }
  .btn-primary {
    background-color: #98D79C;
    border: none;
    color: white;
    margin-bottom: 10px;
  }
  .btn-secondary {
    background-color: white;
    border: 1px solid #98D79C;
    color: #98D79C;
  }
}
input,
.btn {
  border-radius: 5px;
}
#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.123);
  white-space: nowrap;
  padding: 12px;
  width: 100%;
}
#customBtn:hover {
  cursor: pointer;
}
img.icon {
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 12px;
  font-size: 18px;
  line-height: 1;
}
.text-center {
  padding: 12px 0;
  text-align: center;
}
</style>
