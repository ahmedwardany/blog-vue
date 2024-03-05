
<template>
    <layout-div>
        <div class="row justify-content-md-center">
            <div class="col-12">
                <navigation-bar></navigation-bar>
                <div>
                    <div class="container">
                        <div class="card col-lg-8">
                            <div class="card-body">
                                <h5 class="card-header">Create Blog</h5>
                                <form @submit.prevent="createBlog" class="needs-validation" novalidate>
                                    <div class="form-row">
                                        <div class="col-md-12 mb-3">
                                            <label for="validationTooltip01">Title</label>
                                            <input type="text" class="form-control" v-model="title" placeholder="Title" required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <!-- Display validation error for title -->
                                            <div v-if="apiErrors.title" class="invalid">{{ apiErrors.title[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-12 mb-3">
                                            <label for="validationTooltip02">Content</label>
                                            <textarea class="form-control" v-model="content" placeholder="Content" rows="5" required></textarea>
                                            <div class="valid-feedback">Looks good!</div>
                                            <!-- Display validation error for content -->
                                            <div v-if="apiErrors.content" class="invalid">{{ apiErrors.content[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6 mb-3">
                                            <label for="status">Status</label>
                                            <select class="form-control" v-model="status" id="status" required>
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                            </select>
                                            <div v-if="apiErrors.status" class="invalid">{{ apiErrors.status[0] }}</div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="validationTooltip04">Publish Date</label>
                                            <input type="date" class="form-control" v-model="publishDate" required>
                                            <div v-if="apiErrors.publish_date" class="invalid">{{ apiErrors.publish_date[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-12 mb-3">
                                            <label for="validationTooltip05">Image</label>
                                            <input type="file" class="form-control-file" @change="handleImageChange">
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" type="submit">Create</button>
                                </form>
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
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
        status: '',
        image: null, 
        publishDate: '',
        apiErrors: {}
      };
    },
    methods: {
      createBlog() {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('status', this.status);
        formData.append('image', this.image);
        formData.append('publish_date', this.publishDate);
  
        axios.post('/api/blogs', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push('/blogs');
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.apiErrors = error.response.data.errors;
          }
        });
      },
      handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.image = file;
          Swal.fire({
            title: 'Image Selected',
            text: 'You have selected an image.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      },
      logoutAction() {
        axios.post('/api/logout', {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(() => {
            localStorage.setItem('token', '');
            this.$router.push('/');
          })
          .catch(error => {
            console.error('Error logging out:', error);
          });
      }
    }
  };
  </script>
  
  <style>
  .invalid {
    color: red;
  }
  </style>
  