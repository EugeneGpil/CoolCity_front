<template>
  <div>
    <div class="wrapper">
      <Header />
      <Nuxt />
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
}
</style>