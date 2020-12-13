<template>
  <div>
    <div class="wrapper">
      <div class="logo">
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
import RouterSharedMethods from '~/shared_methods/router'
import LocalStorageSharedMethods from '~/shared_methods/local_storage'

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
      this.$store.dispatch('language/setPageToReturnAfterLanguageSelect', 'index')
      // RouterSharedMethods.goTo('language_select')
      this.$router.push({name: RouterSharedMethods.getRouteNameWithLocale('language_select')})
    }

  },

  computed: {

    language() {
      return this.$store.state.language.language
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
    }

  },

}
</script>

<style scoped>
.logo {
  font-family: 'Qwigley', cursive;
  font-size: 45px;
}
.wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.flag {
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>