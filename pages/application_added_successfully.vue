<template>
  <div>
    <div class="product-title th message">
      {{ $t('your_application_added_successfully') }}
      <br>
      {{ $t('we_will_contact_you_soon') }}
    </div>
    <div class="buttons-container">
      <div class="button main-button application-success-button" @click="goToMain()">
        {{ $t('back_to_main_page') }}
      </div>
      <div class="button main-button application-success-button" @click="goToProduct()">
        {{ $t('back_to_product_page') }}
      </div>
    </div>
  </div>
</template>

<script>

import pageNames from '~/settings/pageNames'
import head from '~/settings/head'

export default {
  
  name: 'application_added_successfully',

  methods: {

    goToMain() {
      this.$store.dispatch('router/goTo', pageNames.main)
    },

    goToProduct() {
      this.$store.dispatch('router/goTo', {
        name: pageNames.product,
        params: {
          id: (this.selectedPosition && this.selectedPosition.product_id) ? this.selectedPosition.product_id : 1,
        },
      })
    },

  },

  computed: {

    selectedPosition() {
      return this.$store.state.products.selectedPosition
    }

  },

  head() {
    return head.default.bind(this)(false)
  },

}
</script>

<style scoped lang="scss">
.message {
  margin-top: 30px;
}
.application-success-button {
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 3px;
  margin-right: 3px;
}
.buttons-container {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 550px) {
    flex-direction: row;
    justify-content: center;
  }
}
</style>