export default {

  getPageNameWithoutLanguage(page) {
    if (page === null) {
      return null
    }
    if (typeof page === 'object') {
      page = page.name
    }
    return page.substring(0, page.length - 5)
  },

  getPageInfoWithoutLanguage(page) {
    if (page === null) {
      return null
    }
    return {
      name: this.getPageNameWithoutLanguage(page.name),
      params: page.params,
    }
  },

  getLanguage(page) {
    if (page === null) {
      return null
    }
    if (typeof page === 'object') {
      page = page.name
    }
    return page.substring(page.length - 2)
  }

}
