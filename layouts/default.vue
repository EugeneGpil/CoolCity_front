<template>
  <div>
    <div class="wrapper-wrapper">
      <div class="wrapper">
        <Header />
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>

import Header from '~/components/Header'

export default {
  
  components: {
    Header,
  },

}
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  max-width: 1291px;
  width: 100%;
}
.wrapper-wrapper {
  display: flex;
  justify-content: center;
}
</style>
