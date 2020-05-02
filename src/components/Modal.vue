<template>
  <div class="modal">
    <div class="bg-modal" @click="$emit('close')"></div>
    <div class="modal-wrapper" :style="`width: ${modalWidth || '450px'}`">
      <div class="modal-head gap">
        <slot name="modal-head"></slot>
      </div>
      <div class="modal-body">
        <div class="modal-body__wrapper gap">
          <slot name="modal-body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['modalWidth']
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 2;
  transition: .2s;
  visibility: hidden;
  opacity: 0;
  &.modal-on {
    visibility: visible;
    opacity: 1;
  }
}
.bg-modal {
  background-color: rgba(0, 0, 0, 0.571);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 15;
}
.modal-wrapper {
  position: fixed;
  top: 2vh;
  width: 450px;
  bottom: 2vh;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.19);
  z-index: 20;
  .modal-head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 10vh;
    line-height: 0;
  }
  .modal-body {
    height: 86vh;
    overflow-y: auto;
  }
}
</style>
