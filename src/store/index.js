import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      loading: false,
    };
  },
  mutations: {
    changeLoading(bool) {
      state.loading = bool;
    },
  },
});

export default store;
