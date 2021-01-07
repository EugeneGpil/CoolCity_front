<template>
  <div>

    <Loading v-if="loading" />

    <div v-if="!loading" class="products-wrapper">

      <div
        v-for="product in products"
        :key="product.id"
        class="product-cart"
        @click="goToProduct(product.product_id, product.id)"
      >
        <img class="product-image" :src="product.pictures[0].url">
        <div class="product-info">
          <div class="product-title">
            {{ product.title }}
          </div>
          <div class="product-title">
            {{ product.sell_price }} <span class="currency">฿</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import Loading from '~/components/Loading'
import pageNames from '~/settings/pageNames'
import defaultHead from '~/settings/defaultHead'

export default {

  name: 'index',

  components: {
    Loading
  },
  
  data() {
    return {
      loading: false,
    }
  },

  async fetch() {
    await this.getProducts()
  },

  methods: {

    async getProducts() {
      this.loading = true
      await this.$store.dispatch('products/getProducts')
      this.loading = false
    },

    goToProduct(productId, positionId) {
      this.$store.dispatch('products/setSelectedPositionId', positionId)
      this.$store.dispatch('router/goTo', {name: pageNames.product, params: {id: productId}})
    },

  },

  computed: {

    products() {
      return this.$store.state.products.products
    },

  },

  head() {
    return new defaultHead(this.$t, this.$i18n)
  },
}
</script>

<style scoped lang="scss">
.product-cart {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  max-width: 430px;
  @media screen and (min-width: $first-width-step) {
    padding-left: 5px;
    padding-right: 5px;
  }
}
.products-wrapper {
  justify-content: center;
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
}
.products-wrapper .product-cart {
  @media screen and (min-width: $first-width-step) {
    width: calc(100%/2);
    flex-grow:0;
  }
  @media screen and (min-width: $second-width-step) {
    width: calc(100%/3);
  }
}
.product-image {
  width: 100%;
}
.product-info {
  padding-top: 15px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.currency {
  font-weight: 500;
}
.product-price {
  margin-top: 10px;
  text-align: center;
}
</style>
