<template>
  <div>

    <Loading v-if="loading" />

    <div v-if="!loading" class="wrapper">
      <div class="product-cart">
        <div class="images-wrapper">
          <div class="images-container">
            <img class="product-image" :src="getPositionFirstPictureUrl(selectedPosition)"
              :alt="getPositionAttribute(selectedPosition, 'title', $i18n.locale)"
            >
            <div class="in-image-arrows-container" :class="{hidden: !areArrowsVisible}">
              <font-awesome-icon class="arrow left-arrow" icon="caret-left" />
              <font-awesome-icon class="arrow right-arrow" icon="caret-right" />
            </div>
          </div>
        </div>
        <div class="product-info">
          <h1 class="product-title th">
            {{ getPositionAttribute(selectedPosition, 'title', $i18n.locale) }}
          </h1>
          <div class="color-container">
            <h2 class="color-title product-title th">
              {{ $t('color') }}
            </h2>
            <div class="color-selector">
              <div v-for="productColor in allProductColors">
                <div class="color-container" @click="setPositionIdByColor(productColor)">
                  <div class="color">
                    <div :class="`subcolor subcolor-${productColor.first_color}`" />
                    <div :class="`subcolor subcolor-${getSecondColor(productColor)}`" />
                  </div>
                  <div
                    class="color-fog"
                    :class="{'selected-color-fog': isColorSelected(productColor)}"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="size-container">
            <h2 class="size-title product-title th">
              {{ $t('size') }}
            </h2>
            <div class="size-selector">
              <div
                v-for="size in allSizesByColor"
                class="size product-title"
                :class="{'selected-size': isSizeSelected(size)}"
              >
                {{ size }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buy-container">
        <div class="price-container">
          <div class="price product-title">
            {{ getPositionAttribute(selectedPosition, 'sell_price') }} <span class="currency">฿</span>
          </div>
        </div>
        <div class="button main-button" @click="goToBuy()">
          {{ $t('buy') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Loading from '~/components/Loading'
import productsService from '~/services/productsService'
import pageNames from '~/settings/pageNames'
import productSharedMethods from '~/sharedMethods/product'
import head from '~/settings/head'

export default {

  name: 'Product',

  data() {
    return {
      loading: false,
      positions: [],
      allProductColors: [],
      areArrowsVisible: false,
      allSizesByColor: [],
    }
  },

  components: {
    Loading
  },

  async fetch() {
    this.loading = true

      this.positions = (await productsService.getPositionsByProduct(
        this.$router.currentRoute.params.id
      )).data.payload

      this.setAllDataBySelectedPositionId()

    this.loading = false
  },

  computed: {

    selectedPositionId() {
      return this.$store.state.products.selectedPositionId ?? 0
    },

    selectedPosition() {
      return this.$store.state.products.selectedPosition
    },

    getPositionFirstPictureUrl() {
      return productSharedMethods.getPositionFirstPictureUrl
    },

    getPositionAttribute() {
      return productSharedMethods.getPositionAttribute
    }

  },

  watch: {

    selectedPositionId() {
      this.setAllDataBySelectedPositionId()
    },

  },

  methods: {

    setAllDataBySelectedPositionId() {
      this.setSelectedPosition()
      this.setAreArrowsVisible()
      this.setAllProductColors()
      this.setAllSizesByColor()
    },

    setAllProductColors() {

      if (this.selectedPosition === null) {
        this.allProductColors = []
        return
      }

      let allProductColors = []

      for (let i = 0; i < this.positions.length; i++) {

        let currentPosition = this.positions[i]

        let positionColor = {
          first_color: currentPosition.first_color,
          second_color: null,
        }
        if (
          currentPosition.second_color !== null
          && currentPosition.second_color !== currentPosition.first_color
        ) {
          positionColor.second_color = currentPosition.second_color
        }

        let isColorAlreadyInArray = false;
        for (let j = 0; j < allProductColors.length; j++) {
          let currentColor = allProductColors[j]
          if (
            positionColor.first_color === currentColor.first_color
            && positionColor.second_color === currentColor.second_color
          ) {
            isColorAlreadyInArray = true;
            break
          }
        }

        if (!isColorAlreadyInArray) {
          allProductColors.push(positionColor)
        }
      }

      this.allProductColors = allProductColors
    },

    isColorSelected(colorObject) {
      if (this.selectedPosition === null) {
        return false
      }

      return this.areColorsEqual(colorObject, this.selectedPosition)
    },

    areColorsEqual(colorObject1, colorObject2) {
      if (colorObject1.first_color !== colorObject2.first_color) {
        return false
      }
      if (colorObject1.second_color === colorObject2.second_color) {
        return true
      }
      if (
        colorObject1.second_color !== null
        && colorObject2.second_color === null
        && colorObject1.second_color === colorObject2.first_color
      ) {
        return true
      }
      if (
        colorObject2.second_color !== null
        && colorObject1.second_color === null
        && colorObject2.second_color === colorObject1.first_color
      ) {
        return true
      }
      return false
    },

    getSecondColor(colorObject) {
      if (colorObject.second_color === null) {
        return colorObject.first_color
      }
      return colorObject.second_color
    },

    setAreArrowsVisible() {
      if (this.selectedPosition !== null && this.selectedPosition.pictures.length <= 1) {
        this.areArrowsVisible = false
        return
      }
      this.areArrowsVisible = true
    },

    setSelectedPosition() {
      for (let i = 0; i < this.positions.length; i++) {
        if (this.positions[i].id == this.selectedPositionId || this.selectedPositionId === 0) {
          this.$store.dispatch('products/setSelectedPosition', this.positions[i])
          return
        }
      }
      if (this.positions.length) {
        this.$store.dispatch('products/setSelectedPositionId', this.positions[0].id)
      }
    },

    setAllSizesByColor() {

      if (this.selectedPosition === null) {
        this.allSizesByColor = []
        return
      }

      let allSizesByColor = []

      for (let i = 0; i < this.positions.length; i++) {

        let currentPosition = this.positions[i]

        if (!this.areColorsEqual(this.selectedPosition, currentPosition)) {
          continue
        }

        let isSizeAlreadyInArray = false

        for (let j = 0; j < allSizesByColor.length; j++) {

          let currentSizeByColor = allSizesByColor[j]

          if (currentSizeByColor === currentPosition.size) {
            isSizeAlreadyInArray = true
            break
          }

        }

        if (!isSizeAlreadyInArray) {
          allSizesByColor.push(currentPosition.size)
        }
      }

      this.allSizesByColor = allSizesByColor

    },

    isSizeSelected(size) {
      if (this.selectedPosition === null) {
        return false
      }

      if (this.selectedPosition.size === size) {
        return true
      }
      return false
    },

    setPositionIdByColor(colorObject) {
      if (this.areColorsEqual(colorObject, this.selectedPosition)) {
        return
      }

      for (let i = 0; i < this.positions.length; i++) {

        let currentPosition = this.positions[i]

        if (this.areColorsEqual(colorObject, currentPosition)) {
          this.$store.dispatch('products/setSelectedPositionId', currentPosition.id)
          return
        }

      }
    },

    goToBuy() {
      this.$store.dispatch('router/goTo', {name: pageNames.position_buy, params: {id: this.selectedPosition.id}})
    },

  },

  head() {
    return head.buy.bind(this)()
  },

}
</script>

<style scoped lang="scss">

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
.unavailable-size {
  color: $unavailable-solid-color;
  cursor: default;
}
.color-title {
  font-size: 10px;
}
.color-selector {
  display: flex;
  justify-content: center;
}
.selected-color {
  cursor: default;
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
  @media screen and (min-width: $product-page-first-width-step) {
    display: flex;
  }
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hidden {
  display: none;
}
h1.product-title {
  margin-block-end: 0.67em;
  margin-block-start: 0.67em;
}
</style>
