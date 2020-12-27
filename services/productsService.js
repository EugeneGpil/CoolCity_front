import apiClient from '~/services/apiClient'

export default {

  getProducts() {
    return apiClient.get('/positions')
  },

  getOneProduct(id) {
    return apiClient.get(`/position/${id}`)
  },

  getPositionsByProduct(id) {
    return apiClient.get(`product/${id}/positions`)
  },

  getOnePosition(id) {
    return apiClient.get(`/position/${id}`)
  },

  sendApplication(application) {
    return apiClient.post('/application', application)
  },

}
