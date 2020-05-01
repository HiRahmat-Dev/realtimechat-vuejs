<template>
  <div class="home">
    <nav>
      <header>
        <div class="photo notif-on">
          <img class="dot" src="@/assets/img/svg/dot.svg">
          <div class="img">
            <img :src="authUser !== null ? authUser.photoURL : ''">
          </div>
        </div>
      </header>
      <ul class="option menu-1">
        <li @click="optionMenu1 = 1" :class="{ active: optionMenu1 === 1 }">
          <img src="@/assets/img/svg/home.svg">
        </li>
        <li @click="optionMenu1 = 2" :class="{ active: optionMenu1 === 2 }">
          <img src="@/assets/img/svg/history.svg">
        </li>
        <li @click="optionMenu1 = 3" :class="{ active: optionMenu1 === 3 }">
          <img src="@/assets/img/svg/chat.svg">
        </li>
        <li @click="optionMenu1 = 4" :class="{ active: optionMenu1 === 4 }">
          <img src="@/assets/img/svg/setting.svg">
        </li>
      </ul>
      <ul class="option menu-2">
        <li>
          <img src="@/assets/img/svg/logout.svg">
        </li>
      </ul>
    </nav>
    <div class="body">
      <aside>
        <header class="gap">
          <SearchBox />
        </header>
        <div class="chat-list__wrapper">
          <ChatList v-for="(chat, i) in chats" :key="i" :chat="chat"
                    @chat-click="selectChat"
                    :isTyping="false"
                    :name="currentChat.displayName"/>
        </div>
        <button class="add-friend">+</button>
      </aside>
      <main v-if="!selectedChat" class="chat-empty" >
        <h1>
          pilih chat untuk melanjutkan
        </h1>
      </main>
      <main v-if="selectedChat" >
        <header class="gap">
          <div class="user-info">
            <div class="user-name">
              <h4>{{ userInChat.displayName }}</h4>
            </div>
            <div class="chat-flash">
              <span v-show="userInChat.isLogin && !userInChat.isTyping" style="color: #66a56a;" >Online</span>
              <span v-show="userInChat.isLogin && userInChat.isTyping" class="typing">is typing a message...</span>
              <span v-show="!userInChat.isLogin" >Last seen {{ timeFormat(userInChat.lastTimeLogin) }}</span>
            </div>
          </div>
          <div class="button-optional">
            <img src="@/assets/img/svg/phone.svg">
            <img src="@/assets/img/svg/camera.svg">
            <img src="@/assets/img/svg/menu-dot.svg">
          </div>
        </header>
        <div class="chat-wrapper gap">
          <Message v-for="(message, i) in messages" :key="i"
                   :authUser="message.uid === authUser.uid"
                   :photo="message.photoURL"
                   :message="message.content"
                   :time="messages ? timeFormat(message.createdAt) : ''"/>
        </div>
        <div class="input-chat gap">
          <div class="attachment">
            <img src="@/assets/img/svg/attach-file.svg">
          </div>
          <form @submit.prevent="sendMessage" >
            <input type="text" placeholder="Type your message here"
                   v-model="valueMessage" @keyup="typingOn">
            <button>
              <img src="@/assets/img/svg/send.svg">
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
import ChatList from '@/components/ChatList.vue'
import Message from '@/components/Message.vue'
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  data () {
    return {
      optionMenu1: 3,
      valueMessage: '',
      currentChat: {},
      selectedChat: false
    }
  },
  components: {
    SearchBox,
    ChatList,
    Message
  },
  computed: {
    ...mapState([
      'chats',
      'authUser',
      'messages',
      'userInChat'
    ])
  },
  methods: {
    typingOn () {
      this.$db.collection('users').doc(this.authUser.uid).set({ isTyping: true }, { merge: true })
      setTimeout(() => {
        this.typingOff()
      }, 2500)
    },
    typingOff () {
      this.$db.collection('users').doc(this.authUser.uid).set({ isTyping: false }, { merge: true })
    },
    selectChat (chat) {
      this.currentChat = chat
      this.selectedChat = true
      this.$db.collection(`chats/${chat.id}/messages`).orderBy('createdAt').onSnapshot(querySnapshot => {
        const data = []
        querySnapshot.forEach(doc => {
          data.push(doc.data())
        })
        this.$store.commit('FETCH_MESSAGES', data)
      })
    },
    timeFormat (targetTime) {
      const target = targetTime.toDate()
      const elapsedTime = new Date() - target
      const msPerMinute = 60 * 1000
      const msPerHour = msPerMinute * 60
      const msPerDay = msPerHour * 24
      const msPerMonth = msPerDay * 30
      const msPerYear = msPerDay * 365
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      if (elapsedTime < msPerMinute) {
        return Math.round(elapsedTime / 1000) + 1 + ' seconds ago'
      } else if (elapsedTime < msPerHour) {
        return Math.round(elapsedTime / msPerMinute) + ' minutes ago'
      } else if (elapsedTime < msPerDay) {
        return Math.round(elapsedTime / msPerHour) + ' hours ago'
      } else if (elapsedTime < msPerMonth) {
        return days[target.getDay()] + ' at ' + target.getHours() + ':' + target.getMinutes()
      } else if (elapsedTime < msPerYear) {
        return months[target.getMonth()] + ', ' + target.getDate() + '/' + target.getFullYear() + ' at ' + target.getHours() + ':' + target.getMinutes()
      }
    },
    sendMessage () {
      if (this.valueMessage === '') return
      else {
        this.typingOff()
        this.$db.collection(`chats/${this.currentChat.id}/messages`).add({
          uid: this.authUser.uid,
          name: this.authUser.displayName,
          content: this.valueMessage,
          photoURL: this.authUser.photoURL,
          createdAt: new Date()
        })
      }
      this.valueMessage = ''
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.body {
  display: flex;
}
nav, aside, main {
  display: flex;
  flex-direction: column;
}
.notif-on {
  position: relative;
  .dot {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 17px;
    height: 17px;
    z-index: 3;
    border-radius: 50%;
    background-color: white;
    padding: 3px;
    img {
      width: 80%;
      height: 80%;
    }
  }
}
header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 14vh;
  color: #727272;
}
nav header {
  justify-content: center;
}
div.photo {
  position: relative;
  .img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
nav {
  position: relative;
  z-index: 2;
  background-color: white;
  align-items: center;
  min-width: 80px;
  height: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.061);
  img {
    width: 30px;
    position: relative;
  }
  li {
    list-style: none;
    margin: 0 0 15px 0;
    padding: 9px 10px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 4;
      top: 0;
      left: 0;
    }
    &.active {
      &::after {
        background-color: rgba(152, 215, 156, 0.24);
      }
    }
  }
  ul.menu-2 {
    margin-top: auto;
  }
}
.body {
  width: 100%;
}
.typing {
  color: #98D79C;
}
aside {
  width: 600px;
  position: relative;
  z-index: 1;
  background-color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.034);
  button.add-friend {
    position: absolute;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    bottom: 25px;
    right: 25px;
    outline: none;
    background-color: #98D79C;
    box-shadow: 2px 2px 10px rgba(152, 215, 156, 0.551);
    border: none;
    color: white;
    font-size: 50px;
    font-weight: 300;
    cursor: pointer;
    transition: .1s;
    &:active {
      transform: translateY(3px);
    }
  }
}
.chat-list__wrapper {
  overflow: auto;
  height: 86vh;
}
.gap {
  padding: 0 26px;
}
main {
  position: relative;
  width: 100%;
  background-color: #f6f6f6;
  &.chat-empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header, .button-optional {
    display: flex;
  }
  header {
    border-bottom: 2px solid rgba(0, 0, 0, 0.074);
  }
  .user-info {
    display: flex;
    flex-direction: column;
    .user-name {
      color: #505050;
    }
    .chat-flash {
      height: 17px;
      font-size: 14px;
      margin-top: 7px;
      position: relative;
      span {
        width: 180px;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .button-optional {
    margin-left: auto;
    img {
      margin-left: 5px;
      cursor: pointer;
      width: 50px;
      padding: 10px;
    }
  }
  .chat-wrapper {
    height: 86vh;
    overflow: auto;
    color: #9b9b9b;
  }
  .input-chat {
    margin-top: auto;
    height: 10vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.11);
    display: flex;
    align-items: center;
    img {
      height: 30px;
      cursor: pointer;
    }
    form {
      position: relative;
      display: flex;
      height: 40px;
      width: 100%;
      input {
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
        padding: 10px 60px 10px 20px;
        font-size: 18px;
        color:rgba(0, 0, 0, 0.721);
      }
      button {
        background-color: transparent;
        border: none;
        outline: none;
        position: absolute;
        right: 8px;
        display: flex;
        align-items: center;
        img {
          height: 37px;
        }
      }
    }
  }
}
</style>
