import apiClient from '../services/apiClient'

export default {

  getDefaultImage() {
    return apiClient.get('/first_existing_picture_url')
  },

}