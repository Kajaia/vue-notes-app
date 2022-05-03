<template>
  <div class="container my-5">
    <NotesList />
  </div>
</template>

<script>
import NotesList from "../components/notes/NotesList.vue";

export default {
  name: "HomeView",
  components: { NotesList },
};
</script>
