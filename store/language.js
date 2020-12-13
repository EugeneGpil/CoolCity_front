export const state = () => ({
  pageToReturnAfterLanguageSelect: 'index',
  language: 'thai',
})

export const mutations = {

  setPageToReturnAfterLanguageSelect(context, pageName) {
    context.pageToReturnAfterLanguageSelect = pageName
  },

  setLanguage(context, language) {
    localStorage.setItem('selected_language', language)
    context.language = language
  },

}

export const actions = {

  setPageToReturnAfterLanguageSelect(context, pageName) {
    context.commit('setPageToReturnAfterLanguageSelect', pageName)
  },

  setLanguage(context, language) {
    context.commit('setLanguage', language)
  },

}