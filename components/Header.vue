<template>
  <div>
    <div class="wrapper">
      <div class="logo" @click="goToMain()">
        CoolCity
      </div>
      <div class="language" @click="goToLanguageSelect()">
        <div class="flag"
          :style="`background-image: url('${flag}')`"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import flagPaths from '~/settings/flags'
import pageNames from '~/settings/pageNames'
import routerSharedMethods from '~/sharedMethods/router'

export default {

  methods: {

    goToLanguageSelect() {
      if (this.currentPage.name === pageNames.language_select) {
        this.$router.go(-1)
        return
      }
      this.$store.dispatch('router/goTo', pageNames.language_select)
    },

    goToMain() {
      this.$store.dispatch('router/goTo', pageNames.main)
    },

  },

  computed: {

    language() {
      return this.$i18n.locale
    },

    currentPage() {
      return this.$store.getters['router/currentPage']
    },

    flag() {

      if (this.language == 'en') {
        return flagPaths.british_flag_path
      }

      if (this.language == 'ru') {
        return flagPaths.russian_flag_path
      }

      return flagPaths.thai_flag_path
    },

  },

}
</script>

<style scoped lang="scss">
.logo {
  font-family: 'Qwigley', cursive;
  font-size: 45px;
  cursor: pointer;
}
.wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (min-width: $first-width-step) {
    padding-right: 5px;
  }
}
.flag {
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
