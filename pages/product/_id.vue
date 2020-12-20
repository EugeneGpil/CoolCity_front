<template>
  <div>Product</div>
</template>

<script>

import Loading from '~/components/Loading'

export default {

  name: 'Product',

  data() {
    return {
      loading: false,
    }
  },

  components: {
    Loading
  },

  async fetch() {
    this.loading = true
    // if (currentProduct === null) {

    // }
    this.loading = false
  },

  computed: {

    currentProduct() {
      return this.$store.state.products.getters.currentProduct
    },

  },

}
</script>
