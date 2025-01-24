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
        <div class="images-wrapper">
          <div class="images-container">
            <img class="product-image" :src="product.pictures[0].url"
              :alt="getPositionAttribute(product, 'title', $i18n.locale)"
            >
          </div>
        </div>
        <div class="product-info">
          <h2 class="product-title th">
            {{ getPositionAttribute(product, 'title', $i18n.locale) }}
          </h2>
          <div class="product-title">
            {{ getPositionAttribute(product, 'sell_price') }} <span class="currency">฿</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import Loading from '~/components/Loading'
import pageNames from '~/settings/pageNames'
import head from '~/settings/head'
import productSharedMethods from '~/sharedMethods/product'

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

    getPositionAttribute() {
      return productSharedMethods.getPositionAttribute
    },

    metaImage() {
      return this.$store.state.meta.image
    }

  },

  head() {
    return head.default.bind(this)({
      meta_image: this.metaImage,
    })
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
  width: 100%;
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
.images-container {
  min-width: 0;
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
