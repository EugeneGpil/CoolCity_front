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
export default {

  data() {
    return {
      flag: '/images/flags/flag-thailand.png',
    }
  },
  
  mounted() {
    let selectedLanguage = localStorage.getItem('selected_language')
    if (!selectedLanguage) {
      this.goToLanguageSelect()
      return;
    }
    this.$store.dispatch('language/setLanguage', selectedLanguage)
  },

  methods: {

    goToLanguageSelect() {
      this.$store.dispatch('language/setPageToReturnAfterLanguageSelect', 'index')
      this.$router.push({name: 'language_select'})
    }

  },

  computed: {

    language() {
      return this.$store.state.language.language
    },

  },

  watch: {

    language() {
      let flagPath = '/images/flags/flag-thailand.png'

      if (this.language == 'thai') {
        flagPath = '/images/flags/flag-thailand.png'

      } else if (this.language == 'english') {
        flagPath = '/images/flags/flag-great-britain.png'

      } else if (this.language == 'russian') {
        flagPath = '/images/flags/flag-russia.png'
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