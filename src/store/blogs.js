import axios from 'axios';

const state = {
  blogs: [],
};

const getters = {
  allBlogs: (state) => state.blogs,
};

const actions = {
  async fetchBlogs({ commit }) {
    const response = await axios.get('/blogs');
    commit('setBlogs', response.data);
  },
  async addBlog({ commit }, newBlog) {
    const response = await axios.post('/blogs', newBlog);
    commit('newBlog', response.data);
  },
  async updateBlog({ commit }, updatedBlog) {
    const response = await axios.put(`/blogs/${updatedBlog.id}`, updatedBlog);
    commit('updateBlog', response.data);
  },
  async deleteBlog({ commit }, id) {
    await axios.delete(`/blogs/${id}`);
    commit('removeBlog', id);
  },
};

const mutations = {
  setBlogs: (state, blogs) => (state.blogs = blogs),
  newBlog: (state, blog) => state.blogs.unshift(blog),
  updateBlog: (state, updatedBlog) => {
    const index = state.blogs.findIndex(blog => blog.id === updatedBlog.id);
    if (index !== -1) {
      state.blogs.splice(index, 1, updatedBlog);
    }
  },
  removeBlog: (state, id) =>
    (state.blogs = state.blogs.filter((blog) => blog.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
