<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <i
        class="fas fa-search text-secondary fa-sm position-absolute search-icon"
      ></i>
      <input
        type="text"
        class="form-control border-0 shadow-sm search-input"
        v-model="search"
        placeholder="Search notes..."
      />
    </div>
  </div>
  <div class="row my-4 justify-content-between g-3">
    <div class="col form-group d-flex align-items-center gap-2">
      <select
        id="per-page"
        class="form-select border-0 shadow-sm w-small"
        v-model="params.perPage"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
      <label for="per-page">
        <small>Per page</small>
      </label>
    </div>
    <div class="col form-group text-end">
      <button
        type="button"
        class="btn bg-success shadow-sm px-4"
        data-bs-toggle="modal"
        data-bs-target="#noteAddModal"
      >
        <i class="fas fa-plus fa-sm me-1"></i>
        Add note
      </button>
    </div>
  </div>
  <div class="row justify-content-center g-4">
    <div class="my-5" v-if="!notes.length">
      <p class="mb-0 text-center">Nothing found!</p>
    </div>
    <div class="col-6 col-lg-4 col-xl-3" v-for="note in notes" :key="note.id">
      <div class="card h-100 border-0 shadow-sm" :class="note.color">
        <div class="card-body">
          <h5
            class="card-title d-flex align-items-center justify-content-between"
          >
            {{ capitalise(note.title) }}
          </h5>
          <p class="card-text">
            {{ note.description }}
          </p>
        </div>
        <div
          class="card-footer border-0 d-flex align-items-center justify-content-center flex-wrap gap-1"
        >
          <button
            type="button"
            class="btn btn-sm btn-dark shadow-sm btn-circle p-0"
            data-bs-toggle="modal"
            data-bs-target="#noteEditModal"
            @click="setNote(note)"
          >
            <i class="fas fa-pen fa-sm"></i>
          </button>
          <button
            class="btn btn-sm btn-dark shadow-sm btn-circle p-0"
            @click="deleteNote(note.title, note.id)"
          >
            <i class="fas fa-trash fa-sm"></i>
          </button>
          <button
            class="btn btn-sm btn-dark shadow-sm btn-circle p-0"
            @click="pinNote(note.title, note.id)"
          >
            <i class="fas fa-thumbtack fa-sm"></i>
          </button>
          <button
            class="btn btn-sm btn-dark shadow-sm btn-circle p-0"
            @click="archiveNote(note.title, note.id)"
          >
            <i class="fas fa-archive fa-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-5 d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" :class="params.page === 1 ? 'disabled' : ''">
        <a class="page-link border-0 shadow-sm cursor-pointer" @click="prevPage"
          >Previous</a
        >
      </li>
      <li
        class="page-item"
        :class="params.page === params.last_page ? 'disabled' : ''"
      >
        <a class="page-link border-0 shadow-sm cursor-pointer" @click="nextPage"
          >Next</a
        >
      </li>
    </ul>
  </div>
  <NoteAdd @refresh="getNotes" />
  <NoteEdit :note="note" @refresh="getNotes" />
  <LoadingSpinner />
</template>

<script>
import axios from "axios";
import base_url from "../../helpers";
import toast from "../../helpers/toast";
import LoadingSpinner from "../others/LoadingSpinner.vue";
import NoteEdit from "./NoteEdit.vue";
import NoteAdd from "./NoteAdd.vue";

export default {
  name: "NotesList",
  components: { LoadingSpinner, NoteEdit, NoteAdd },
  data() {
    return {
      notes: [],
      params: {
        page: 1,
        last_page: null,
        perPage: 10,
      },
      note: {},
      search: "",
    };
  },
  watch: {
    params: {
      handler() {
        this.getNotes();
      },
      deep: true,
    },
    search: {
      handler() {
        this.getNotes();
      },
      deep: true,
    },
  },
  methods: {
    getNotes() {
      this.$store.state.loading = true;
      axios
        .get(`${base_url}/notes`, {
          params: {
            page: this.params.page,
            perPage: this.params.perPage,
            search: this.search,
          },
        })
        .then((res) => {
          this.$store.state.loading = false;
          this.notes = res.data.data;
          this.params.last_page = res.data.meta.last_page;
        })
        .catch(console.error());
    },
    deleteNote(title, id) {
      this.$store.state.loading = true;
      axios
        .delete(`${base_url}/notes/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.$store.state.loading = false;
            this.getNotes();
            toast("success", `"${title}" removed successfully!`);
          }
        })
        .catch(console.error());
    },
    pinNote(title, id) {
      this.$store.state.loading = true;
      axios
        .post(`${base_url}/pin/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.$store.state.loading = false;
            this.getNotes();
            toast("success", `"${title}" updated successfully!`);
          }
        })
        .catch(console.error());
    },
    archiveNote(title, id) {
      this.$store.state.loading = true;
      axios
        .post(`${base_url}/archive/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.$store.state.loading = false;
            this.getNotes();
            toast("success", `"${title}" archived successfully!`);
          }
        })
        .catch(console.error());
    },
    prevPage() {
      if (this.params.page > 1) {
        this.params.page--;
        this.scrollToTop();
      }
    },
    nextPage() {
      if (this.params.page < this.params.last_page) {
        this.params.page++;
        this.scrollToTop();
      }
    },
    setNote(note) {
      this.note = note;
      this.canvas = true;
    },
    capitalise(str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>

<style scoped>
.w-small {
  width: 80px;
}

.btn-circle {
  border-radius: 50%;
  width: 28px;
  height: 28px;
}

.search-icon {
  margin-top: 11px;
  margin-left: 10px;
}

.search-input {
  padding-left: 30px;
}
</style>
