<template>
  <div class="message"
       :class="authUser || false ? 'sent-msg' :'received-msg' ">
    <div class="message-wrapper">
      <div class="photo">
        <div class="img">
          <img :src="photo">
        </div>
      </div>
      <div class="message-info">
        <div class="bubble-message">
          <p>{{ message || 'please wait...' }}
          </p>
        </div>
        <div class="time-message">
          <span>{{ time || 'please wait' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['authUser', 'photo', 'message', 'time']
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  margin: 14px 0 20px;
  width: 100%;
  p {
    line-height: 1.5;
  }
  .message-wrapper {
    display: flex;
    width: 80%;
  }
  .photo {
    margin-right: 14px;
  }
  .message-info {
    display: flex;
    flex-direction: column;
  }
  .bubble-message {
    padding: 15px 25px;
    margin-bottom: 7px;
    border-radius: 14px 14px 14px 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.061);
  }
  .time-message {
    span {
      font-size: 12px;
    }
  }
  &.received-msg {
    align-items: flex-start;
    .message-wrapper {
      justify-content: flex-start;
    }
    .photo {
      display: block;
    }
    .message-info {
      align-items: flex-start;
    }
    .bubble-message {
      border-radius: 14px 14px 14px 0;
      background-color: #98D79C;
      p {
        color: #ffffff;
      }
    }
  }
  &.sent-msg {
    align-items: flex-end;
    .message-wrapper {
      justify-content: flex-end;
    }
    .photo {
      display: none;
    }
    .message-info {
      align-items: flex-end;
    }
    .bubble-message {
      border-radius: 14px 14px 0px 14px;
      background-color: white;
      p {
        color: #505050;
      }
    }
  }
}
</style>
