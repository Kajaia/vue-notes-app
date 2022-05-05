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
        <div class="modal-header" :class="color">
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
              required
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
          <div class="form-group mt-3">
            <label class="form-label">Choose color</label>
            <div class="d-flex align-items-center gap-3 flex-wrap">
              <div class="form-check">
                <input
                  type="radio"
                  id="white"
                  class="form-check-input bg-light p-4 cursor-pointer"
                  v-model="color"
                  value="bg-light"
                  checked
                />
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  id="blue"
                  class="form-check-input bg-primary p-4 cursor-pointer"
                  v-model="color"
                  value="bg-primary"
                />
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  id="green"
                  class="form-check-input bg-success p-4 cursor-pointer"
                  v-model="color"
                  value="bg-success"
                />
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  id="red"
                  class="form-check-input bg-danger p-4 cursor-pointer"
                  v-model="color"
                  value="bg-danger"
                />
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  id="yellow"
                  class="form-check-input bg-warning p-4 cursor-pointer"
                  v-model="color"
                  value="bg-warning"
                />
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  id="gray"
                  class="form-check-input bg-secondary p-4 cursor-pointer"
                  v-model="color"
                  value="bg-secondary"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="submit" class="btn shadow-sm px-4" :class="color">
            <i class="fas fa-save fa-sm me-1"></i>
            Add note
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
      color: "bg-light",
    };
  },
  methods: {
    addNote() {
      this.$store.state.loading = true;
      axios
        .post(`${base_url}/notes`, {
          title: this.title,
          description: this.description,
          color: this.color,
          pinned: 0,
          archived: 0,
        })
        .then((res) => {
          this.$store.state.loading = false;
          if (res.status === 201) {
            this.$emit("refresh");
            this.closeModal();
            toast("success", `"${this.title}" added successfully!`);
            this.clearInputs();
          }
        })
        .catch(console.error());
    },
    closeModal() {
      let myModal = document.querySelector(".modal.show");
      let modal = bootstrap.Modal.getInstance(myModal);
      modal.hide();
    },
    clearInputs() {
      this.title = "";
      this.description = "";
      this.color = "bg-light";
    },
  },
};
</script>
