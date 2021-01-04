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
import localStorageSharedMethods from '~/sharedMethods/localStorage'
import pageNames from '~/settings/pageNames'

export default {

  data() {
    return {
      flag: flagPaths.thai_flag_path,
    }
  },
  
  mounted() {
    const selectedLanguage = localStorageSharedMethods.getLanguage()
    if (!selectedLanguage) {
      this.goToLanguageSelect()
      return;
    }
    this.$i18n.setLocale(selectedLanguage)
    this.$store.dispatch('language/setLanguage', selectedLanguage)
  },

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
    }

  },

  computed: {

    language() {
      return this.$store.state.language.language
    },

    currentPage() {
      return this.$store.getters['router/currentPage']
    },

  },

  watch: {

    language() {
      let flagPath = flagPaths.thai_flag_path

      if (this.language == 'th') {
        flagPath = flagPaths.thai_flag_path

      } else if (this.language == 'en') {
        flagPath = flagPaths.british_flag_path

      } else if (this.language == 'ru') {
        flagPath = flagPaths.russian_flag_path
      }

      this.flag = flagPath
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