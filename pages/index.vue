<template>
  <div>
    <div class="products-wrapper">

      <div class="product-cart">
        <img class="product-image" src='/product_images/1.jpg'>
        <div class="product-info">
          <div class="product-name">
            Super long Product Name
          </div>
          <div class="product-price">
            200 <span class="currency">฿</span>
          </div>
        </div>
      </div>

      <div class="product-cart">
        <img class="product-image" src='/product_images/1.jpg'>
        <div class="product-info">
          <div class="product-name">
            Super long Product Name
          </div>
          <div class="product-price">
            200 <span class="currency">฿</span>
          </div>
        </div>
      </div>

      <div class="product-cart">
        <img class="product-image" src='/product_images/1.jpg'>
        <div class="product-info">
          <div class="product-name">
            Super long Product Name
          </div>
          <div class="product-price">
            200 <span class="currency">฿</span>
          </div>
        </div>
      </div>

      <div class="product-cart">
        <img class="product-image" src='/product_images/1.jpg'>
        <div class="product-info">
          <div class="product-name">
            Super long Product Name
          </div>
          <div class="product-price">
            200 <span class="currency">฿</span>
          </div>
        </div>
      </div>

      <div class="product-cart">
        <img class="product-image" src='/product_images/1.jpg'>
        <div class="product-info">
          <div class="product-name">
            Super long Product Name
          </div>
          <div class="product-price">
            200 <span class="currency">฿</span>
          </div>
        </div>
      </div>

      <div class="product-cart">
        <img class="product-image" src='/product_images/1.jpg'>
        <div class="product-info">
          <div class="product-name">
            Super long Product Name
          </div>
          <div class="product-price">
            200 <span class="currency">฿</span>
          </div>
        </div>
      </div>

      <div class="product-cart">
        <img class="product-image" src='/product_images/1.jpg'>
        <div class="product-info">
          <div class="product-name">
            Super long Product Name
          </div>
          <div class="product-price">
            200 <span class="currency">฿</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.product-cart {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  max-width: 430px;
  @media screen and (min-width: $first-width-step) {
    padding-left: 5px;
    padding-right: 5px;
  }
}
.products-wrapper {
  justify-content: center;
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
}
.products-wrapper .product-cart {
  @media screen and (min-width: $first-width-step) {
    width: calc(100%/2);
    flex-grow:0;
  }
  @media screen and (min-width: $second-width-step) {
    width: calc(100%/3);
  }
}
.product-image {
  width: 100%;
}
.product-info {
  padding-top: 15px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1px;
  line-height: 1.4;
  text-transform: uppercase;
}
.product-name {
  text-align: center;
}
.currency {
  font-weight: 500;
}
.product-price {
  margin-top: 10px;
}
</style>
