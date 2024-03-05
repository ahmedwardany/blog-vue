<template>
    <layout-div>
        <div class="row justify-content-md-center">
            <div class="col-12">
                <navigation-bar></navigation-bar>
                <div>
                    <div class="container">
                        <div class="card col-lg-8">
                            <div class="card-body">
                                <h5 class="card-header">Edit Subscriber</h5>
                                <form @submit.prevent="updateSubscriber" class="needs-validation" novalidate>
                                    <div class="form-row">
                                        <div class="col-md-4 mb-3">
                                            <label for="validationTooltip01">Name</label>
                                            <input type="text" class="form-control" v-model="name" placeholder="Name"
                                                required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div v-if="apiErrors.name" class="invalid">{{ apiErrors.name[0] }}</div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationTooltipUsername">Username</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="username"
                                                    placeholder="Username"
                                                    aria-describedby="validationTooltipUsernamePrepend" required>
                                                <div class="valid-feedback">Looks good!</div>
                                                <div v-if="apiErrors.Username" class="invalid">{{ apiErrors.Username[0] }}</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationTooltip02">Email</label>
                                            <input type="email" class="form-control" v-model="email" placeholder="Email"
                                                required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div v-if="apiErrors.email" class="invalid">{{ apiErrors.email[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-12 mb-3">
                                            <label>Status</label>
                                            <div class="custom-control custom-switch">
                                                <input type="checkbox" class="custom-control-input" id="statusSwitch"
                                                    v-model="status">
                                                <label class="custom-control-label" for="statusSwitch">{{ status ? 'Active'
                                                    : 'Inactive' }}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" type="submit">Update</button>
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

export default {
    data() {
        return {
            id: this.$route.params.id,
            name: '',
            username: '',
            email: '',
            status: false, 
            apiErrors: {} 
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
                    this.status = subscriber.status === 'active'; // Convert status to boolean
                })
                .catch(error => {
                    console.error('Error fetching subscriber:', error);
                });
        },
        updateSubscriber() {
            const token = localStorage.getItem('token');

            axios.put(`/api/subscribers/${this.id}`, {
                name: this.name,
                username: this.username,
                email: this.email,
                status: this.status ? 'active' : 'inactive' // Convert boolean to status string
            }, {
                headers: {
                    Authorization: `Bearer `+ token // Replace `yourBearerToken` with the actual token value
                }
            })
            .then(response => {
                console.log(response); // Use response here if needed
                // Handle success, e.g., redirect to subscriber list
                this.$router.push('/subscribers');
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    this.apiErrors = error.response.data.errors;

                }
            });
        }
    },
    mounted() {
        this.fetchSubscriber();
    }
};
</script>
<style>
.invalid {
    color: red;
}
</style>