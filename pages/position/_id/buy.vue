<template>
  <div>

    <Loading v-if="loading" />

    <div v-if="!loading" class="wrapper">
      <div class="page-wrapper">

        <h1 class="product-title page-title th">
          {{ $t('you_want_to_buy') }}
        </h1>

        <div class="card-wrapper">

          <div class="product-info">
            
            <div class="images-wrapper">
              <div class="images-container">
                <img class="product-image" :src="getPositionFirstPictureUrl(selectedPosition)"
                  :alt="getPositionAttribute(selectedPosition, 'title', $i18n.locale)"
                >
              </div>
            </div>

            <h2 class="product-title th product-name">
              {{ getPositionAttribute(selectedPosition, 'title', $i18n.locale) }}
            </h2>

            <div class="product-options">

              <div class="product-title size selected-size">
                {{ getPositionAttribute(selectedPosition, 'size') }}
              </div>

              <div class="color-container">
                <div class="color">
                  <div :class="`subcolor subcolor-${getPositionAttribute(selectedPosition, 'first_color')}`" />
                  <div :class="`subcolor subcolor-${getPositionAttribute(selectedPosition, 'second_color')}`" />
                </div>
              </div>

            </div>

          </div>

          <div class="user-info">
            
            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title th product-title">{{ $t('name') }}:</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title th" v-model="name">
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title th">{{ $t('phone') }}:</div>
                </div>
              </div>
              <div class="inputs-container">
                <div class="phone-input-container">
                  <div class="phone-code product-title">+66</div>
                  <input class="input product-title" :placeholder="112223344" type="number" v-model="phone">
                </div>
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title th">
                    <div>{{ $t('postcode') }}</div>
                  :</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title" :placeholder="'52431'" type="number" v-model="postcode">
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title th">{{ $t('address') }}:</div>
                </div>
              </div>
              <div class="inputs-container">
                <textarea class="product-title th textarea input" rows="4" cols="1" v-model="address"/>
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title">email:</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title" :placeholder="'box@mail.com'" v-model="email">
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title">facebook:</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title" :placeholder="'web.facebook.com/'" v-model="facebook">
              </div>
            </div>
          
            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title">line:</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title" :placeholder="'+66112223344'" v-model="line">
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title">whatsapp:</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title" :placeholder="'+66112223344'" v-model="whatsapp">
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title">telegram:</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title" :placeholder="'+66112223344'" v-model="telegram">
              </div>
            </div>

            <div class="form">
              <div class="labels-container">
                <div class="input-title-container">
                  <div class="input-title product-title">vk:</div>
                </div>
              </div>
              <div class="inputs-container">
                <input class="input product-title" :placeholder="'vk.com/id654321'" v-model="vk">
              </div>
            </div>

          </div>

        </div>

        <div class="button main-button" :class="{'unavailable-button': isSendButtonLoading}"
          @click="send()"
        >
          {{ $t('send') }}
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import Loading from '~/components/Loading'
import productsService from '~/services/productsService'
import productSharedMethods from '~/sharedMethods/product'
import pageNames from '~/settings/pageNames'
import head from '~/settings/head'

export default {
    
  name: 'buy',

  data() {
    return {
      loading: false,
      name: '',
      phone: '',
      postcode: '',
      address: this.$t('thailand_en_or_th'),
      email: '',
      facebook: '',
      line: '',
      whatsapp: '',
      telegram: '',
      vk: '',
      isSendButtonLoading: false,
    }
  },

  components: {
    Loading,
  },

  methods: {

    async send() {
      if (this.isSendButtonLoading === true) {
        return;
      }

      this.isSendButtonLoading = true;

        let addApplicationResponse = (await productsService.sendApplication({
          position_id: this.selectedPosition.id,
          name: this.name,
          phone: this.phone,
          postcode: this.postcode,
          address: this.address,
          email: this.email,
          facebook: this.facebook,
          line: this.line,
          whatsapp: this.whatsapp,
          telegram: this.telegram,
          vk: this.vk,
        })).data

        if (addApplicationResponse.status === true) {
          this.$store.dispatch('router/goTo', pageNames.application_added_successfully)
        }

      this.isSendButtonLoading = false
    },

  },

  async fetch() {
    this.loading = true

    if (this.selectedPosition.id !== this.$router.currentRoute.params.id) {
      let position = (await productsService.getOnePosition(this.$router.currentRoute.params.id)).data.payload[0]
      this.$store.dispatch('products/setSelectedPosition', position)
      this.$store.dispatch('products/setSelectedPositionId', position.id)
    }

    this.loading = false
  },

  computed: {

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

  head() {
    return head.buy.bind(this)()
  },

}
</script>

<style scoped lang="scss">
.product-title.page-title.th {
  font-size: 17px;
}
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.images-container {
  max-width: 600px;
  flex: 1;
  width: 100%;
}
.card-wrapper {
  width: 100%;
}
.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}
.product-name {
  margin-top: 15px;
}
.product-options {
  margin-top: 5px;
  display: flex;
  width: fit-content;
}
.color {
  cursor: default;
}
.card-wrapper {
  @media screen and (min-width: 600px) {
    display: flex;
  }
}
.user-info {
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
}
.phone-input-container {
  display: flex;
  align-items: center;
}
.input-title-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 22px;
  margin-bottom: 5px;
}
.input {
  width: 100%;
  margin-bottom: 5px;
  text-align: left;
}
.inputs-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.phone-code {
  margin-bottom: 5px;
  margin-right: 2px;
}
.labels-container {
  padding-right: 5px;
  flex: 0.75;
  @media screen and (min-width: 350px) {
    flex: 0.5;
  }
  @media screen and (min-width: 450px) {
    flex: 0.35;
  }
  @media screen and (min-width: 600px) {
    flex: 0.65;
  }
  @media screen and (min-width: 750px) {
    flex: 0.5;
  }
  @media screen and (min-width: 900px) {
    flex: 0.35;
  }
  @media screen and (min-width: 1000px) {
    flex: 0.3;
  }
}
.textarea {
  flex: 1;
  text-align: left;
}
.main-button {
  margin-top: 10px;
}
.input-title {
  text-align: right;
  display: flex;
  align-items: center;
}
.unavailable-button {
  background-color: $unavailable-solid-color;
  cursor: default;
}
</style>
