<template>
  <div class="row my-4 justify-content-between">
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
    <div class="col-md-3 form-group">
      <select
        id="order"
        class="form-select border-0 shadow-sm"
        v-model="params.orderBy"
      >
        <option value="created_at">Date</option>
        <option value="title">Name</option>
      </select>
    </div>
  </div>
  <div class="row justify-content-center g-4">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="note in notes"
      :key="note.id"
    >
      <div class="card h-100 border-0 shadow-sm" :class="note.color">
        <div class="card-body">
          <h5 class="card-title">
            {{ note.title }}
          </h5>
          <p class="card-text">
            {{ note.description }}
          </p>
        </div>
        <div class="card-footer border-0">
          <button
            class="btn btn-sm btn-danger shadow-sm rounded-pill"
            @click="deleteNote(note.title, note.id)"
          >
            X
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
  <LoadingSpinner />
</template>

<script>
import axios from "axios";
import base_url from "../../helpers";
import toast from "../../helpers/toast";
import LoadingSpinner from "../others/LoadingSpinner.vue";

export default {
  name: "NotesList",
  components: { LoadingSpinner },
  data() {
    return {
      notes: [],
      params: {
        page: 1,
        last_page: null,
        perPage: 10,
        orderBy: "created_at",
      },
    };
  },
  watch: {
    params: {
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
            orderBy: this.params.orderBy,
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
    prevPage() {
      if (this.params.page > 1) {
        this.params.page--;
      }
    },
    nextPage() {
      if (this.params.page < this.params.last_page) {
        this.params.page++;
      }
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.w-small {
  width: 80px;
}
</style>
