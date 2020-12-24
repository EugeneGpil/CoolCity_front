<template>
  <div>

    <Loading v-if="loading" />

    <div v-if="!loading" class="wrapper">
      <div class="product-cart">
        <div class="images-container">
          <div class="main-image-container">
            <div class="image-main-container">
              <div class="image-subcontainer">
                <div class="image"
                  :style="`background-image: url('${getSelectedPositionPictureUrl()}')`"
                >
                  <div class="in-image-arrows-container"
                    :class="{hidden: !areArrowsVisible}"
                  >
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
            {{ getSelectedPositionAttrubute('title') }}
          </h1>
          <div class="color-container">
            <div class="color-title product-title">
              {{ $t('color') }}
            </div>
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
            <div class="size-title product-title">
              {{ $t('size') }}
            </div>
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
            {{ getSelectedPositionAttrubute('sell_price') }} <span class="currency">฿</span>
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
import productsService from '~/services/productsService'

export default {

  name: 'Product',

  data() {
    return {
      loading: false,
      positions: [],
      selectedPositionId: null,
      selectedPosition: null,
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

      this.selectedPositionId = this.previouslySelectedPositionId ?? 0;

    this.loading = false
  },

  computed: {

    previouslySelectedPositionId() {
      return this.$store.state.products.selectedPositionId
    },

  },

  watch: {

    selectedPositionId() {
      this.setSelectedPosition()
      this.setAreArrowsVisible()
      this.setAllProductColors()
      this.setAllSizesByColor()
    },

  },

  methods: {

    getSelectedPositionPictureUrl() {
      if (this.selectedPosition === null) {
        return ''
      }
      return this.selectedPosition.pictures[0].url
    },

    getSelectedPositionAttrubute(attributeName) {
      if (this.selectedPosition === null) {
        return ''
      }
      return this.selectedPosition[attributeName]
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
          this.selectedPosition = this.positions[i]
          return
        }
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
          this.selectedPositionId = currentPosition.id
          return
        }

      }
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
.subcolor-grey {
  background-color: $grey-button-background;
}
.subcolor-pink {
  background-color: $pink-button-background;
}
.subcolor-blue {
  background-color: $blue-button-background;
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
.hidden {
  display: none;
}
</style>
