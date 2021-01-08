import productSharedMethods from '~/sharedMethods/product'

export default {

  default: function() {
    return {
      title: `Cool City - ${this.$t('online_fashion_clothing_store_in_thailand')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('default_description_meta_tag'),
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.$t('default_description_meta_tag'),
        },
      ],
    }
  },

  buy: function() {

    let selectedPosition = this.$store.state.products.selectedPosition
    let title = productSharedMethods.getPositionAttribute(selectedPosition, 'title', this.$i18n.locale)

    let description = `${this.$t('here_you_can_buy')} ${title}. ${this.$t('delivery_throughout_thailand')}`
    if (this.$i18n.locale === 'th') {
      description = `${this.$t('here_you_can_buy')}${title} ${this.$t('delivery_throughout_thailand')}`
    }

    return {
      title:
        `Cool City - ${this.$t('buy')} ${title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: description,
        },
      ],
    }
  }
}
