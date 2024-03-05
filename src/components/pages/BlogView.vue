<template>
    <layout-div>
      <div class="row justify-content-md-center">
        <div class="col-12">
            <navigation-bar></navigation-bar>
          <div>
            <div class="container">
              <div class="card col-lg-8">
                <div class="card-body">
                  <h5 class="card-header">View Blog</h5>
                  <div class="form-row">
                    <div class="col-md-6 mb-3">
                      <b>ID:</b>
                      <p>{{ id }}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                      <b>Title:</b>
                      <p>{{ title }}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                    <b>Image:</b>
                    <img :src="image" alt="Blog Image" style="max-width: 100%;">
                    </div>
                    <div class="col-md-6 mb-3">
                      <b>Content:</b>
                      <p>{{ content }}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                    <b>Status:</b>
                    <p>{{ status }}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                      <b>Publish Date:</b>
                      <p>{{ publishDate }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </layout-div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        id: this.$route.params.id,
        title: '',
        content: '',
        status: false, // Assuming default status is inactive
        publishDate: '' // Assuming publish date is a string
      };
    },
    methods: {
      fetchBlog() {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
  
        axios.get(`/api/blogs/${this.id}`, config)
          .then(response => {
            const blog = response.data.data;
            this.title = blog.title;
            this.content = blog.content;
            this.image = blog.image; 
            this.status = blog.status; // Convert status to boolean
            this.publishDate = blog.publish_date; // Assuming publish date is a string
          })
          .catch(error => {
            console.error('Error fetching blog:', error);
          });
      }
    },
    mounted() {
      this.fetchBlog();
    }
  };
  </script>
  