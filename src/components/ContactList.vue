<template>
  <div @click="$emit('contact-click', user)" class="contact-list gap">
    <div class="photo">
      <div class="img">
        <img :src="photo || require('@/assets/img/sender.jpg')">
      </div>
    </div>
    <div class="contact-info">
      <div class="user-name">
        <h4>{{ name }}</h4>
      </div>
      <div class="contact-flash">
        <span v-show="!isLogin" >Offline</span>
        <span class="typing"
              v-show="isLogin" >Online</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  props: ['isLogin', 'photo', 'name', 'lastLogin', 'user'],
  data () {
    return {
      isChatting: false
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-list {
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
  .contact-info {
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
    .contact-flash {
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
}
</style>
