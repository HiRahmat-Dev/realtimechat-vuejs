<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'ChatApp',
  computed: {
  },
  created () {
    this.$firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid
        } = user
        const data = {
          isTyping: false,
          isLogin: true,
          uid,
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          lastTimeLogin: new Date()
        }
        this.$db.collection('users').doc(uid).set(data, { merge: true })
        this.$db.collection('users').onSnapshot(docs => {
          const data = []
          docs.docs.forEach(doc => {
            // data.push(doc.data())
            if (doc.uid !== uid) {
              data.push(doc.data())
            }
          })
          this.$store.commit('SET_USERS', data)
        })
        this.$db.collection('users').doc(uid).get()
          .then(doc => {
            const dataLogin = {
              ...doc.data()
            }
            this.$store.commit('SET_AUTH_USER', dataLogin)
            this.$db.collection('chats').orderBy('chatAt').onSnapshot(querySnapshot => {
              const data = []
              querySnapshot.forEach(doc => {
                dataLogin.chats.forEach(chat => {
                  if (chat === doc.id) {
                    const newUsersInChat = []
                    doc.data().usersInChat.forEach(userInChat => {
                      userInChat.onSnapshot(queryUserInChat => {
                        if (queryUserInChat.data().uid !== uid) {
                          newUsersInChat.push(queryUserInChat.data())
                          this.$store.commit('SET_USER_IN_CHAT', queryUserInChat.data())
                        }
                      })
                    })
                    const dataChats = {
                      chatAt: doc.data().chatAt,
                      usersInChat: newUsersInChat
                    }
                    data.push({ id: doc.id, ...dataChats })
                  }
                })
              })
              this.$store.commit('FETCH_CHATS', data)
            })
          })
      } else {
        if (this.$route.name === 'Login') return
        this.$store.commit('LOGOUT')
        this.$firebase.auth().signOut()
        this.$router.push('/login')
      }
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
* {
  margin: 0;
  padding: 0;
  font-family: 'Josefin Sans', sans-serif;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
