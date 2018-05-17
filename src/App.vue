<template>
    <div id="app">
      <datepicker datetype="day" v-model="day"></datepicker>
    </div>
</template>

<script>
import datepicker from './lib/datepicker/datepicker.vue'
export default {
  name: 'app',
  data () {
    return {
      day: ''
    }
  },
  components: {
    datepicker
  }
}
</script>
<style lang="scss">
@import "./scss/common.scss";
  @import "./scss/font.scss";
</style>
