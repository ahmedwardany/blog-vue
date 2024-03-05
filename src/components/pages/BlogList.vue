<template>
    <layout-div>
      <div class="row justify-content-md-center">
        <div class="col-12">
            <navigation-bar></navigation-bar>
          <div>
            <h2 class="text-center pt-4">Blog List</h2>
  
            <div class="container table-responsive py-5">
              <div class="mb-3">
                <div class="row">
                  <div class="col-md-6">
                    <input v-model="searchText" type="text" class="form-control" placeholder="Search by title or content">
                  </div>
                  <div class="col-md-6">
                    <button @click="createBlog" class="btn btn-primary">Create</button>
                  </div>
                </div>
              </div>
              <table class="table table-bordered table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="blog in filteredBlogs" :key="blog.id">
                    <td>{{ blog.title }}</td>
                    <td>{{ blog.content }}</td>
                    <td>
                        <button @click="editBlog(blog)" class="btn btn-primary">Edit</button>
                      <button @click="confirmDelete(blog.id)" class="btn btn-danger">Delete</button>
                      <button @click="viewBlog(blog.id)" class="btn btn-success">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="filteredBlogs.length === 0" class="text-center">No blogs found.</div>
            </div>
          </div>
        </div>
      </div>
    </layout-div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        blogs: [],
        searchText: ''
      };
    },
    computed: {
      filteredBlogs() {
        if (!this.searchText) return this.blogs;
        const searchTextLower = this.searchText.toLowerCase();
        return this.blogs.filter(blog =>
          blog.title.toLowerCase().includes(searchTextLower) ||
          blog.content.toLowerCase().includes(searchTextLower)
        );
      }
    },
    created() {
      this.fetchBlogs();
    },
    methods: {
        createBlog() {
            // Navigate to the create form route
            this.$router.push({ name: 'BlogCreate' });
        },
      fetchBlogs() {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        axios.get('/api/blogs',config)
          .then(response => {
            this.blogs = response.data.data; 
          })
          .catch(error => {
            console.error('Error fetching blogs:', error);
          });
      },
      editBlog(blog) {
            // Navigate to the update form route
            this.$router.push({ name: 'BlogEdit', params: { id: blog.id } });
        },
        viewBlog(BlogId) {
            this.$router.push({
                name: 'BlogView'
                , params: { id: BlogId }
            });
        },
      confirmDelete(blogId) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this blog!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteBlog(blogId);
          }
        });
      },
      deleteBlog(blogId) {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        axios.delete(`/api/blogs/${blogId}`,config)
          .then(() => {
            this.fetchBlogs();
            Swal.fire(
              'Deleted!',
              'Blog has been deleted.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting blog:', error);
            Swal.fire(
              'Error!',
              'Failed to delete blog.',
              'error'
            );
          });
      }
    }
  };
  </script>
  