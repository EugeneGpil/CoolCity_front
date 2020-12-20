export default {

  getPageNameWithoutLanguage(page) {
    if (typeof page === 'string') {
      return page.substring(0, page.length - 5)
    }
    return page.name.substring(0, page.name.length -5)
  },

  getPageInfoWithoutLanguage(page) {
    return {
      name: this.getPageNameWithoutLanguage(page.name),
      params: page.params,
    }
  },

}
