<template>
  <div @click="$emit('chat-click', chat)" class="chat-list gap"
       :class="{ active: isChatting }">
    <div class="photo">
      <div class="img">
        <img :src="photo || require('@/assets/img/sender.jpg')">
      </div>
    </div>
    <div class="chat-info">
      <div class="user-name">
        <h4>{{ name || 'Nama' }}</h4>
      </div>
      <div class="chat-flash">
        <span v-show="!isTyping || false" >{{ !messages ? 'Isi pesan terbaru' : messages[messages.length - 1].content }}</span>
        <span class="typing"
              v-show="isTyping || false" >is typing a message...</span>
      </div>
    </div>
    <div class="time-status">
      <span>February 22</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  props: ['isTyping', 'photo', 'name', 'messages', 'chat'],
  data () {
    return {
      isChatting: false
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-list {
  display: flex;
  align-items: center;
  color: rgb(114, 114, 114);
  height: 90px;
  border-bottom: 1px solid rgba(152, 215, 156, 0.24);
  cursor: pointer;
  &:hover {
    background-color: rgba(152, 215, 156, 0.24);
  }
  &:last-child {
    border: none;
  }
  &.active {
    background-color: rgba(152, 215, 156, 0.24);
  }
  .chat-info {
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
  .time-status {
    width: auto;
    overflow: hidden;
    height: 45px;
    display: flex;
    margin-left: auto;
    span {
      margin-top: 2.5px;
      font-size: 12px;
      color: #9b9b9b;
    }
  }
}
</style>
