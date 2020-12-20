import ApiClient from '~/services/ApiClient'

export default {

  getProducts() {
    return ApiClient.get('/positions')
  },

  getOneProduct(id) {
    return ApiClient.get(`/position/${id}`)
  }

}
