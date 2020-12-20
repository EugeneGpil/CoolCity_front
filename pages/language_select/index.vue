<template>
  <div>
    <div class="languages-list-wrapper">
      <div class="languages-list">
        <div class="language-row" @click="setLanguage('th')">
          <div>
            ไทย
          </div>
          <div class="flag"
            :style="`background-image: url('${thaiFlagPath}')`"
          ></div>
        </div>
        <div class="language-row" @click="setLanguage('en')">
          <div>
            English
          </div>
          <div class="flag"
            :style="`background-image: url('${britishFlagPath}')`"
          ></div>
        </div>
        <div class="language-row" @click="setLanguage('ru')">
          <div>
            Русский
          </div>
          <div class="flag"
            :style="`background-image: url('${russianFlagPath}')`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import flagsPaths from '~/settings/flags'
import pageNames from '~/settings/pageNames'

export default {

  name: 'LanguageSelect',

  data() {
    return {
      pageToReturn: null,
      thaiFlagPath: flagsPaths.thai_flag_path,
      britishFlagPath: flagsPaths.british_flag_path,
      russianFlagPath: flagsPaths.russian_flag_path,
    }
  },

  methods: {

    setLanguage(language) {
      this.$store.dispatch('language/setLanguage', language)
      this.$store.dispatch('router/goTo', this.previousPage ?? pageNames.main)
    },

  },

  computed: {

    previousPage() {
      return this.$store.state.router.previousPage
    },

  },

}
</script>

<style scoped>
.language-row {
  font-size: 30px;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
}
.languages-list {
  width: 350px;
}
.languages-list-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
