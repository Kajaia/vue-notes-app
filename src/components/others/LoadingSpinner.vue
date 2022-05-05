<template>
  <div
    v-if="$store.state.loading"
    class="loading-spinner d-flex align-items-center justify-content-center"
  >
    <div class="spinner-grow text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
.loading-spinner {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #000;
  top: 0;
  right: 0;
  z-index: 99999;
  opacity: 0.5;
}
</style>
