import apiClient from '../services/apiClient'

export default {

  getProductsIds() {
    return apiClient.get('/products_ids')
  },

  getPositionsIds() {
    return apiClient.get('/positions_ids')
  },

}