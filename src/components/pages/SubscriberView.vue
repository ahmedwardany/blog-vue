<template>
    <layout-div>
        <div class="row justify-content-md-center">
            <div class="col-12">
                <navigation-bar></navigation-bar>
                <div>
                    <div class="container">
                        <div class="card col-lg-8">
                            <div class="card-body">
                                <h5 class="card-header">View Subscriber</h5>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <b>ID:</b>
                                        <p>{{ id }}</p>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <b>Name:</b>
                                        <p>{{ name }}</p>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <b>Username:</b>
                                        <p>{{ username }}</p>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <b>Email:</b>
                                        <p>{{ email }}</p>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <b>Created At:</b>
                                        <p>{{ created_at }}</p>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <b>Updated At:</b>
                                        <p>{{ updated_at }}</p>
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
        name: '',
        username: '',
        email: '',
        status: false // Assuming default status is inactive
      };
    },
    methods: {
      fetchSubscriber() {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
  
        axios.get(`/api/subscribers/${this.id}`, config)
          .then(response => {
            const subscriber = response.data.data;
            this.name = subscriber.name;
            this.username = subscriber.username;
            this.email = subscriber.email;
            this.created_at = formatDate(subscriber.created_at);
            this.updated_at = formatDate(subscriber.updated_at);
            this.status = subscriber.status === 'active'; // Convert status to boolean
          })
          .catch(error => {
            console.error('Error fetching subscriber:', error);
          });
          function formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            let day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            return `${year}-${month}-${day}`;
            }
      }
    },
    mounted() {
      this.fetchSubscriber();
    }
  };
  </script>
  