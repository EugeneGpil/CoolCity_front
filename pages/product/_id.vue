<template>
  <div>
    <div class="wrapper">
      <div class="product-cart">
        <div class="images-container">
          <div class="main-image-container">
            <div class="image-main-container">
              <div class="image-subcontainer">
                <div class="image"
                  :style="`background-image: url('/product_images/1/red/1.jpeg')`"
                >
                  <div class="in-image-arrows-container">
                    <font-awesome-icon class="arrow left-arrow" icon="caret-left" />
                    <font-awesome-icon class="arrow right-arrow" icon="caret-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-info">
          <h1 class="product-title">
            super product long or even much longer title
          </h1>
          <div class="size-container">
            <div class="size-title product-title">
              size
            </div>
            <div class="size-selector">
              <div class="size product-title unavailable-size">
                s
              </div>
              <div class="size product-title selected-size">
                m
              </div>
              <div class="size product-title">
                xl
              </div>
            </div>
          </div>
          <div class="color-container">
            <div class="color-title product-title">
              color
            </div>
            <div class="color-selector">
              <div class="color-container">
                <div class="color">
                  <div class="subcolor subcolor-red" />
                  <div class="subcolor subcolor-red" />
                </div>
                <div class="color-fog selected-color-fog" />
              </div>
              <div class="color-container">
                <div class="color">
                  <div class="subcolor subcolor-white" />
                  <div class="subcolor subcolor-white" />
                </div>
                <div class="color-fog" />
              </div>
              <div class="color-container">
                <div class="color">
                  <div class="subcolor subcolor-black" />
                  <div class="subcolor subcolor-black" />
                </div>
                <div class="color-fog" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buy-container">
        <div class="price-container">
          <div class="price product-title">
            165 <span class="currency">฿</span>
          </div>
        </div>
        <div class="button main-button">
          buy
        </div>
      </div>
    </div>
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

<style scoped lang="scss">
$first-width-step: 600px;

.main-image-container {
  display: flex;
  align-items: center;
}
.image-main-container {
  flex: 1;
}
.image-subcontainer {
  position: relative;
  height: 0;
  border: none;
  padding-top: 100%;
}
.image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: $unavailable-color;
}
.arrow {
  font-size: 54px;
  padding-left: 5px;
  padding-right: 5px;
  height: 50px;
  cursor: pointer;
  &:hover {
    background: $red-button-background;
  }
}
.left-arrow {
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
.right-arrow {
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}
.product-title {
  margin-top: 15px;
}
.in-image-arrows-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.size-selector {
  display: flex;
  justify-content: center;
}
.size-title {
  font-size: 10px;
}
.size {
  font-size: 25px;
  background-color: $unavailable-color;
  width: 60px;
  border-radius: 7px;
  margin: 3px;
  cursor: pointer;
}
.unavailable-size {
  color: $unavailable-solid-color;
  cursor: default;
}
.selected-size {
  background-color: $red-button-background;
  cursor: default;
}
.color-title {
  font-size: 10px;
}
.color-selector {
  display: flex;
  justify-content: center;
}
.color {
  width: 60px;
  height: 35px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}
.subcolor {
  flex: 1;
  width: 100%;
}
.subcolor-red {
  background-color: $red-button-background;
}
.subcolor-white {
  background-color: $white-button-background;
}
.subcolor-black {
  background-color: $black-button-background;
}
.selected-color {
  cursor: default;
}
.color-container {
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  margin: 3px;
}
.color-fog {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(196,196,196,0.75) 0%, rgba(196,196,196,0.75) 100%);
  &:hover {
    background: none;
  }
}
.selected-color-fog {
  background: none;
}
.buy-container {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
.price {
  margin-top: 0;
  font-size: 17px;
}
.price-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
}
.product-cart {
  @media screen and (min-width: $first-width-step) {
    display: flex;
  }
}
.images-container {
  @media screen and (min-width: $first-width-step) {
    min-width: 300px;
    max-width: 600px;
    flex: 1;
  }
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
