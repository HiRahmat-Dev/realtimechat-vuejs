<template>
  <form @submit.prevent="$emit('submit-search', valueSearch)">
    <label for="search">
      <img src="@/assets/img/svg/magnifying-glass.svg">
    </label>
    <input id="search" type="text"
           v-model="valueSearch"
           :placeholder="placeholder || 'Cari'">
  </form>
</template>

<script>
export default {
  name: 'SearchBox',
  props: ['placeholder'],
  data () {
    return {
      valueSearch: ''
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 14px 14px 14px 60px;
  background-color: #F6F6F6;
  border-radius: 100px;
  border: none;
  outline: none;
}
label {
  position: absolute;
  left: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 1;
  img {
    width: 33px;
    object-fit: cover;
  }
}
</style>
