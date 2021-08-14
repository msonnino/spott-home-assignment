<template>
    <form @submit="onSubmit">
      <p>Product: {{currentProduct.productName}}</p>
      <p>ID: {{currentProduct.id}} </p>
      <BaseInput
        v-model.number="currentProduct.cogs.unitManufacturingCost"
        label="Unit Manufacturing Cost: "
        type="Number"
      />
      <br>
      <BaseInput
        v-model.number="currentProduct.cogs.shipmentUnitCost"
        label="Shipment Unit Cost: "
        type="Number"
      />
      <br>
      <BaseInput
        v-model.number="currentProduct.cogs.monthlyAdvertismentCost"
        label="Monthly Advertisment Cost: "
        type="Number"
      />
      <br>
      <label for="manufacturingCountry">Manufacturing Country:</label>
      <select id="manufacturingCountry" v-model="currentProduct.cogs.manufacturingCountry">
          <option v-for="country in countriesList" :key="country.code" :value="country.code"> {{country.name}} </option>
      </select>
      <br>
      <input class="button" type="submit" value="Save Changes">
    </form>
</template>

<script>
import CountriesList from './CountriesList.js'
import ProductService from '../sevices/ProductService.js'
import BaseInput from './BaseInput.vue'
export default {
  name: 'ProductEditor',
  components: {
    BaseInput
  },
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
