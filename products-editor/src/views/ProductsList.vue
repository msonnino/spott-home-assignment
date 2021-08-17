<template>
  <div class="products-list">
    <div v-for="product in products" :key="product.id">
      <ProductEditor :product="product"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductEditor from '@/components/ProductEditor.vue'
import ProductService from '../sevices/ProductService.js'

export default {
  name: 'ProductsList',
  components: {
    ProductEditor
  },
  data () {
    return {
      products: null
    }
  },
  created () {
    ProductService.getProducts()
      .then((response) => {
        this.products = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<style scoped>
.products-list {
  padding: 0px 200px 0px 200px;
  text-align: left;
}
</style>
