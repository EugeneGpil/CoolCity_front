<template>
  <div>
    {{ product ? product.id : ''}}
  </div>
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
    if (!this.product) {
      await this.$store.dispatch('products/addCurrentProduct')
    }
    this.loading = false
  },

  computed: {

    product() {
      let productId = this.$router.history.current.params.id
      let allProducts = this.$store.state.products.products
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].id === parseInt(productId)) {
          return allProducts[i]
        }
      }

      return null
    },

  },

}
</script>
