<template>
  <div>
    <pre>Server env: {{ JSON.stringify(serverEnv) }}</pre>
    <pre>Client env: {{ JSON.stringify(clientEnv) }}</pre>
  </div>
</template>

<script>
  export default {
    asyncData ({ app }) {
      const serverEnv = process.server ? app.$env : null
      return { serverEnv, clientEnv: null }
    },
    mounted () {
      this.clientEnv = process.client ? this.$env : null
    }
  }
</script>
