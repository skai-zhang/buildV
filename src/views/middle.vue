<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "middle",
  mounted: function () {
      this.$router.push({ name: "build", params: { code: this.$route.params.code,download: this.$route.params.download } });
  },
};
</script>