<template>
  <div @mouseenter="arrowOpt = true"
       @mouseleave="arrowOpt = false"
       v-if="name" class="chat-list gap">
    <div @click="$emit('chat-click', chat)" class="photo">
      <div class="img">
        <img :src="photo || require('@/assets/img/sender.jpg')">
      </div>
    </div>
    <div @click="$emit('chat-click', chat)" class="chat-info">
      <div class="user-name">
        <h4>{{ name || 'Nama' }}</h4>
      </div>
      <div class="chat-flash">
        <span v-show="!isLogin" >Offline</span>
        <span class="typing"
              v-show="isLogin && !isTyping" >Online</span>
        <span class="typing"
              v-show="isLogin && isTyping" >is typing a message...</span>
      </div>
    </div>
    <div @click="$emit('option-click', chat)" class="chat-option">
      <img :class="{ 'peek': arrowOpt }" src="@/assets/img/svg/arrow-option.svg">
    </div>
    <div class="chat-option__modal" :class="{ 'option-modal__on': chatOption === chat.id }">
      <ul>
        <li @click="$emit('deleteChat', chat)" >Delete Chat</li>
        <li>Pin Chat</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  props: ['isLogin', 'isTyping', 'photo', 'name', 'lastLogin', 'chat', 'chatOption'],
  data () {
    return {
      arrowOpt: false
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-list {
  position: relative;
  display: flex;
  align-items: center;
  color: rgb(114, 114, 114);
  height: 90px;
  border-bottom: 1px solid rgba(152, 215, 156, 0.24);
  cursor: pointer;
  &:hover {
    background-color: rgba(152, 215, 156, 0.108);
  }
  &:last-child {
    border: none;
  }
  &.active {
    background-color: rgba(152, 215, 156, 0.24);
  }
  .chat-info {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 45px;
    padding-left: 15px;
    .user-name {
      font-weight: 500;
      color: rgb(80, 80, 80);
      h4 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .chat-flash {
      height: 17px;
      font-size: 14px;
      overflow: hidden;
      margin-top: 10px;
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
  // .time-status {
  //   width: auto;
  //   overflow: hidden;
  //   height: 45px;
  //   display: flex;
  //   margin-left: auto;
  //   span {
  //     margin-top: 2.5px;
  //     font-size: 12px;
  //     color: #9b9b9b;
  //   }
  // }
  .chat-option {
    position: absolute;
    right: 20px;
    width: 20px;
    height: 20px;
    overflow: hidden;
    img {
      transform: translateX(17.5px);
      width: 100%;
      transition: all .06s;
      &.peek {
        transform: translateX(0px);
      }
    }
  }
  .chat-option__modal {
    position: absolute;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.074);
    border-radius: 5px;
    overflow: hidden;
    right: 0;
    bottom: -70%;
    z-index: 10;
    padding: 7px 0;
    visibility: hidden;
    opacity: 0;
    transition: .1s;
    &.option-modal__on {
      visibility: visible;
      opacity: 1;
      bottom: -80%;
    }
    li {
      padding: 10px 20px;
      &:hover {
        background-color: rgba(152, 215, 156, 0.108);
      }
    }
  }
}
</style>
