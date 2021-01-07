export default function ($t, $i18n) {

  this.$t = $t
  this.$i18n = $i18n

  return {
    title: `Cool City - ${this.$t('online_fashion_clothing_store_in_thailand')}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: this.$t('here_you_can_buy_nice_clothes_at_a_really_low_price'),
      },
    ],
  }
}
