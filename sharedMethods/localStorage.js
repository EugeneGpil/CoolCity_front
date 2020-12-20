import LanguageSettings from '~/settings/language'

export default {

  getLanguage: () => {
    return localStorage.getItem(LanguageSettings.local_storage_selected_language_item_name)
  },

  setLanguage: (language) => {
    localStorage.setItem(
      LanguageSettings.local_storage_selected_language_item_name,
      language
    )
  }
}
