export const state = () => ({
  language: 'th',
})

export const mutations = {

  setLanguage(context, language) {
    localStorage.setItem('selected_language', language)
    context.language = language
  },

}

export const actions = {

  setLanguage(context, language) {
    context.commit('setLanguage', language)
  },

}