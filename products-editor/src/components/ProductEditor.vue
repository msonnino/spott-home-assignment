<template>
    <br>
    <div class="card mb-4 rounded-3 shadow-sm">
      <form @submit="onSubmit">
      <div class="card-header">
        <div class="row">
          <div class="col-sm-6">
            <p><b>Product:</b> {{currentProduct.productName}}</p>
          </div>
          <div class="col-sm-6">
            <p><b>ID:</b> {{currentProduct.id}} </p>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseInput
        v-model.number="currentProduct.cogs.unitManufacturingCost"
        label="Unit Manufacturing Cost: "
        type="Number"
      />
      <BaseInput
        v-model.number="currentProduct.cogs.shipmentUnitCost"
        label="Shipment Unit Cost: "
        type="Number"
      />
      <BaseInput
        v-model.number="currentProduct.cogs.monthlyAdvertismentCost"
        label="Monthly Advertisment Cost: "
        type="Number"
      />
      <div class="row">
        <div class="col-sm-6">
          <label class="form-label"><b>Manufacturing Country:</b></label>
        </div>
        <div class="col-sm-6">
          <select class="form-select" v-model="currentProduct.cogs.manufacturingCountry">
          <option v-for="country in countriesList" :key="country.code" :value="country.code"> {{country.name}} </option>
      </select>
        </div>
      </div>
      <br>
      <div class="row text-center">
        <div>
          <input class="button btn btn-primary" type="submit" value="Save Changes">
        </div>
      </div>
      </div>
    </form>
    </div>
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
