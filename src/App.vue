<template>
  <div class="showDifference">
    <b-navbar variant="faded" type="light" class="border-bottom shadow-sm">
      <b-navbar-brand tag="h1" class="mb-0">Price between max and min in Bitcoin</b-navbar-brand>
    </b-navbar>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // binding to template
      items: []
    }
  },
  mounted () {
    // get data from server
    this.axios
      .get('./api')
      .then(response => {
        this.items = response.data
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
