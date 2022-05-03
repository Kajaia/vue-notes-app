<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="editCanvas"
    aria-labelledby="editCanvasLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="editCanvasLabel">
        Edit "{{ note.title }}"
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <form class="offcanvas-body" @submit.prevent="updateNote">
      <div class="form-group">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          id="title"
          class="form-control border-0 shadow-sm"
          v-model="title"
        />
      </div>
      <div class="form-group mt-4">
        <label for="description" class="form-label">Description</label>
        <textarea
          cols="30"
          rows="5"
          id="description"
          class="form-control border-0 shadow-sm"
          v-model="description"
        ></textarea>
      </div>
      <div class="mt-4 text-center">
        <button type="submit" class="btn btn-primary shadow-sm px-4">
          Save changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import base_url from "../../helpers";
import toast from "../../helpers/toast";

export default {
  name: "NoteEdit",
  props: ["note", "canvas"],
  data() {
    return {
      title: "",
      description: "",
    };
  },
  watch: {
    note: {
      handler() {
        this.title = this.note.title;
        this.description = this.note.description;
      },
      deep: true,
    },
  },
  methods: {
    updateNote() {
      this.$store.state.loading = true;
      axios
        .put(`${base_url}/notes/${this.note.id}`, {
          title: this.title,
          description: this.description,
          color: this.note.color,
          pinned: this.note.pinned,
          archived: this.note.archived,
        })
        .then((res) => {
          this.$store.state.loading = false;

          if (res.status === 200) {
            this.$emit("refresh");
            toast("success", `"${this.title}" updated successfully!`);
          }
        })
        .catch(console.error());
    },
  },
};
</script>
