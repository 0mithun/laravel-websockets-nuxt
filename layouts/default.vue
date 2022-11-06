<template>
  <div>
      <Nuxt />
  </div>
</template>

<script>
  export default {
      middleware: 'auth',
      mounted() {
        this.$echo.private('testChannel')
          .listen('TestEvent', (e) => {
              console.log('test event received');
          });
      }
  }
</script>

<style lang="scss" scoped>

</style>
