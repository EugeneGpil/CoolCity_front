import ApiClient from '~/services/ApiClient'

export default {

  getProducts() {
    return ApiClient.get('/positions')
  }

}
