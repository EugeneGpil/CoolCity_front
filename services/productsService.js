import apiClient from '~/services/apiClient'

export default {

  getProducts() {
    return apiClient.get('/positions')
  },

  getOneProduct(id) {
    return apiClient.get(`/position/${id}`)
  }

}
