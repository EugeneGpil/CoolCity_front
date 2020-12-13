<template>
  <div>
    <div class="language-row" @click="setLanguage('thai')">
      <div>
        ไทย
      </div>
      <div class="flag thailand-flag"></div>
    </div>
    <div class="language-row" @click="setLanguage('english')">
      <div>
        English
      </div>
      <div class="flag great-britain-flag"></div>
    </div>
    <div class="language-row" @click="setLanguage('russian')">
      <div>
        Русский
      </div>
      <div class="flag russia-flag"></div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      pageToReturn: null
    }
  },

  mounted() {
    this.pageToReturn = this.$store.state.language.pageToReturnAfterLanguageSelect
    this.$store.dispatch('language/setPageToReturnAfterLanguageRequest', 'index')
  },

  methods: {

    setLanguage(language) {
      this.$store.dispatch('language/setLanguage', language)
      this.$router.push({name: this.$store.state.language.pageToReturnAfterLanguageSelect})
    }

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
.thailand-flag {
  background-image: url('/images/flags/flag-thailand.png');
}
.great-britain-flag {
  background-image: url('/images/flags/flag-great-britain.png')
}
.russia-flag {
  background-image: url('/images/flags/flag-russia.png');
}
</style>