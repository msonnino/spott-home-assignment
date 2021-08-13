<template>
    <form @submit="onSubmit">
            <label for="name">Product: {{product.productName}}</label>
            <br>
            <label for="id">Product ID:</label>
            <input type="text" id="id" disabled :value="product.id">
            <br>
            <label for="unitManufacturingCost">Unit Manufacturing Cost:</label>
            <input type="number" id="unitManufacturingCost" v-model.number="currentProduct.cogs.unitManufacturingCost">
            <br>
            <label for="shipmentUnitCost">Shipment Unit Cost:</label>
            <input type="number" id="shipmentUnitCost" v-model.number="currentProduct.cogs.shipmentUnitCost">
            <br>
            <label for="monthlyAdvertismentCost">Monthly Advertisment Cost:</label>
            <input type="number" id="monthlyAdvertismentCost" v-model.number="currentProduct.cogs.monthlyAdvertismentCost">
            <br>
            <label for="manufacturingCountry">Manufacturing Country:</label>
            <select id="manufacturingCountry" v-model="currentProduct.cogs.manufacturingCountry">
                <option v-for="country in countriesList" :key="country.code" :value="country.code"> {{country.name}} </option>
            </select>
            <span>Selected: {{ currentProduct.cogs.manufacturingCountry }}</span>
            <br>
            <input class="button" type="submit" value="Save Changes">
    </form>
</template>

<script>
import CountriesList from './CountriesList.js'
import ProductService from '../sevices/ProductService.js'

export default {
  name: 'ProductEditor',
  props: {
    product: {
      type: Object,
      requierd: true
    }
  },
  data () {
    return {
      currentProduct: this.product,
      countriesList: CountriesList.countriesList
    }
  },
  methods: {
    onSubmit () {
      ProductService.updateCogs(this.currentProduct)
      console.log(this.currentProduct)
    }
  }
}
</script>
