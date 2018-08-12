<template>
  <div class="showDifference">
    <b-navbar variant="faded" type="light" class="border-bottom shadow-sm">
      <b-navbar-brand tag="h1" class="mb-0">Price between max and min in Bitcoin</b-navbar-brand>
    </b-navbar>
    <div class="text-center w-75 _pos">
      <b-table striped hover :items="items"></b-table>
    </div>
    <b-navbar variant="secondary" type="dark">
      <b-navbar-brand class="_about" href="#">Build by Yu Chen</b-navbar-brand>
  </b-navbar>
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

<style lang="scss" scoped>
._pos {
  font-family: 'Roboto';
  font-size: 14px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0 auto;
}

._about {
  font-family: 'Roboto';
  font-size: 14px;
}
</style>
