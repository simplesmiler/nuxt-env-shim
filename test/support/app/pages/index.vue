<template>
  <div>
    <pre>Server env: {{ JSON.stringify(serverEnv, null, 2) }}</pre>
    <pre>Server data: {{ JSON.stringify(serverData, null, 2) }}</pre>
    <pre>Client env: {{ JSON.stringify(clientEnv, null, 2) }}</pre>
    <pre>Client data: {{ JSON.stringify(clientData, null, 2) }}</pre>
  </div>
</template>

<script>
  export default {
    async asyncData ({ app }) {
      const serverEnv = process.server ? app.$env : null;
      const serverData = process.server ? await app.$axios.$get('/') : null;
      return { serverEnv, serverData, clientEnv: null, clientData: null };
    },
    async mounted () {
      this.clientEnv = process.client ? this.$env : null;
      this.clientData = await this.$axios.$get('/');
    },
  };
</script>
