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

import FlagPaths from '~/settings/flags'
import LocalStorageSharedMethods from '~/shared_methods/local_storage'
import PageNames from '~/settings/pageNames'

export default {

  data() {
    return {
      flag: FlagPaths.thai_flag_path,
    }
  },
  
  mounted() {
    const selectedLanguage = LocalStorageSharedMethods.getLanguage()
    if (!selectedLanguage) {
      this.goToLanguageSelect()
      return;
    }
    this.$i18n.setLocale(selectedLanguage)
    this.$store.dispatch('language/setLanguage', selectedLanguage)
  },

  methods: {

    goToLanguageSelect() {
      if (this.currentPage.name == PageNames.language_select) {
        this.$router.go(-1)
        return
      }
      this.$store.dispatch('router/goTo', PageNames.language_select)
    },

    goToMain() {
      this.$store.dispatch('router/goTo', PageNames.main)
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
      let flagPath = FlagPaths.thai_flag_path

      if (this.language == 'th') {
        flagPath = FlagPaths.thai_flag_path

      } else if (this.language == 'en') {
        flagPath = FlagPaths.british_flag_path

      } else if (this.language == 'ru') {
        flagPath = FlagPaths.russian_flag_path
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
}
</style>