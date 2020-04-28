<template>
  <div class="home">
    <nav>
      <header>
        <div class="photo notif-on">
          <img class="dot" src="@/assets/img/svg/dot.svg">
          <img src="@/assets/img/sender.jpg">
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
          <ChatList/>
        </div>
      </aside>
      <main>
        <header class="gap">
          <div class="user-info">
            <div class="user-name">
              <h4>Rahmat Hidayatullah</h4>
            </div>
            <div class="chat-flash">
              <span v-show="!isTyping" >Last seen 2 hours ago</span>
              <span v-show="isTyping" >is typing a message...</span>
            </div>
          </div>
          <div class="button-optional">
            <img src="@/assets/img/svg/phone.svg">
            <img src="@/assets/img/svg/camera.svg">
            <img src="@/assets/img/svg/menu-dot.svg">
          </div>
        </header>
        <div class="chat-wrapper">
        </div>
        <div class="input-chat gap">
          <div class="attachment">
            <img src="@/assets/img/svg/attach-file.svg">
          </div>
          <form @submit.prevent >
            <input type="text" placeholder="Type your message here">
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

export default {
  name: 'Home',
  data () {
    return {
      optionMenu1: 3
    }
  },
  components: {
    SearchBox,
    ChatList
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
    bottom: 1px;
    right: 1px;
    width: 17px;
    height: 17px;
    border: 3.5px solid white;
    z-index: 3;
  }
}
header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 14vh;
  color: rgb(114, 114, 114);
}
nav header {
  justify-content: center;
}
div.photo {
  position: relative;
  img {
    border-radius: 50%;
    width: 50px;
    object-fit: cover;
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
aside {
  width: 600px;
  position: relative;
  z-index: 1;
  background-color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.034);
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
      color: rgb(80, 80, 80);
    }
    .chat-flash {
      height: 17px;
      font-size: 14px;
      overflow: hidden;
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
        padding: 10px 50px 10px 15px;
        font-size: 18px;
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
