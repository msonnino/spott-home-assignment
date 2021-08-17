<template>
  <div class="row">
    <div class="col-sm-6" >
      <label class="form-label"> <b> {{ label }} </b> </label>
  </div>
  <div class="col-sm-6">
    <input
        v-bind="$attrs"
        class="field form-control"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
  </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
