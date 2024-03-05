<template>
  <layout-div>
    <div class="row justify-content-md-center">
      <div class="col-12">
        <navigation-bar></navigation-bar>
        <h2 class="text-center mt-5">Welcome, {{ user?.name }}!</h2>
        <div class="row mt-5" v-if="blogs.length > 0">
          <div class="col-md-4" v-for="blog in blogs" :key="blog.id">
            <div class="card mb-4 shadow-sm">
              <img v-if="blog.image" :src="blog.image" class="card-img-top" alt="Blog Image">
              <div class="card-body">
                <h5 class="card-title">{{ blog.title }}</h5>
                <p class="card-text">{{ blog.shortDetails }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <router-link :to="'/blogs/' + blog.id" class="btn btn-sm btn-outline-secondary">View</router-link>
                  </div>
                  <small class="text-muted">{{ blog.publishDate }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center">No blogs to display.</p>
        </div>
      </div>
    </div>
  </layout-div>
</template>

<script>
import LayoutDiv from '../LayoutDiv.vue';
import axios from 'axios';

export default {
  name: 'DashboardPage',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      user: {},
      blogs: [], // Array to hold blog data
    };
  },
  created() {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null) {
      this.$router.push('/')
    } else {
      this.getUser();
      this.getBlogList(); // Fetch blog list on component creation
    }
  },
  methods: {
    getUser() {
      axios.get('/api/subscriber', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    },
    getBlogList() {
      axios.get('/api/blogs', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }) // Assuming this endpoint returns a list of blogs
        .then((response) => {
          this.blogs = response.data.data; // Assuming response data is an array of blogs
          console.log('Blogs:', this.blogs); // Log blogs for debugging
        })
        .catch((error) => {
          console.error('Error fetching blog list:', error);
        });
    }
  }
};
</script>
