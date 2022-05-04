<template>
  <div
    class="modal fade"
    id="noteAddModal"
    tabindex="-1"
    aria-labelledby="noteAddModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <form class="modal-content" @submit.prevent="addNote">
        <div class="modal-header">
          <h5 class="modal-title" id="noteAddModalLabel">Add note</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              class="form-control"
              placeholder="Ex: Lorem ipsum"
              v-model="title"
            />
          </div>
          <div class="form-group mt-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              cols="30"
              rows="5"
              id="description"
              class="form-control"
              placeholder="Ex: Lorem ipsum dolor, sit amet..."
              v-model="description"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary shadow-sm px-4">
            Save changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import base_url from "../../helpers";
import toast from "../../helpers/toast";

export default {
  name: "NoteAdd",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    addNote() {
      this.$store.state.loading = true;
      axios
        .post(`${base_url}/notes`, {
          title: this.title,
          description: this.description,
          color: "bg-white",
          pinned: 0,
          archived: 0,
        })
        .then((res) => {
          this.$store.state.loading = false;
          if (res.status === 201) {
            this.$emit("refresh");
            this.closeModal();
            toast("success", `"${this.title}" added successfully!`);
          }
        })
        .catch(console.error());
    },
    closeModal() {
      let myModal = document.querySelector(".modal.show");
      let modal = bootstrap.Modal.getInstance(myModal);
      modal.hide();
    },
  },
};
</script>
