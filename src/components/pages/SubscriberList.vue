<template>
    <layout-div>
        <div class="row justify-content-md-center">
            <div class="col-12">
                <navigation-bar></navigation-bar>
                <div>
                    <h2 class="text-center pt-4">Subscriber List</h2>

                    <div class="container table-responsive py-5">
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-6">
                                    <input v-model="searchText" type="text" class="form-control"
                                        placeholder="Search by name or email">
                                </div>
                                <div class="col-md-6">
                                    <button @click="createSubscriber" class="btn btn-primary">Create</button>
                                </div>
                            </div>
                        </div>
                        <table class="table table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="subscriber in filteredSubscribers" :key="subscriber.id">
                                    <td>{{ subscriber.name }}</td>
                                    <td>{{ subscriber.username }}</td>
                                    <td>{{ subscriber.email }}</td>
                                    <td>
                                        <button @click="editSubscriber(subscriber)" class="btn btn-primary">Edit</button>
                                        <button @click="confirmDelete(subscriber.id)" class="btn btn-danger">Delete</button>
                                        <button @click="viewSubscriber(subscriber.id)" class="btn btn-success">View</button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </layout-div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
    computed: {
        ...mapGetters(['subscribers']),
        filteredSubscribers() {
            if (!this.searchText) return this.subscribers.data;
            return this.subscribers.data.filter(subscriber =>
                subscriber.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                subscriber.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
                subscriber.email.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
    },
    data() {
        return {
            searchText: '',
        };
    },
    created() {
        this.$store.dispatch('fetchSubscribers')
            .then(() => {
                console.log('Subscribers fetched successfully:', this.subscribers);
            })
            .catch(error => {
                console.error('Error fetching subscribers:', error);
            });
    },
    methods: {
        createSubscriber() {
            // Navigate to the create form route
            this.$router.push({ name: 'SubscriberCreate' });
        },
        editSubscriber(subscriber) {
            // Navigate to the update form route
            this.$router.push({ name: 'SubscriberEdit', params: { id: subscriber.id } });
        },
        viewSubscriber(subscriberId) {
            this.$router.push({
                name: 'SubscriberView'
                , params: { id: subscriberId }
            });
        },
        confirmDelete(subscriberId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this subscriber!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // If confirmed, delete the subscriber
                    this.deleteSubscriber(subscriberId);
                }
            });
        },
        async deleteSubscriber(subscriberId) {
            try {
                // Send a DELETE request to the backend API
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                };

                // Send a DELETE request to the backend API with the token included in the headers
                await axios.delete(`/api/subscribers/${subscriberId}`, config);
                // Optionally, fetch updated subscribers list after deletion
                this.$store.dispatch('fetchSubscribers');
                Swal.fire(
                    'Deleted!',
                    'Subscriber has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting subscriber:', error);
                Swal.fire(
                    'Error!',
                    'Failed to delete subscriber.',
                    'error'
                );
            }
        },

        logoutAction() {
            axios.post('/api/logout', {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
                .then(() => {
                    localStorage.setItem('token', "")
                    this.$router.push('/')
                })
                .catch((error) => {
                    console.error('Error logging out:', error);
                });
        },
    },
};
</script>
  