<template>
    <layout-div>
        <div class="row justify-content-md-center">
            <div class="col-12">
                <navigation-bar></navigation-bar>
                <div>
                    <div class="container">
                        <div class="card col-lg-8">
                            <div class="card-body">
                                <h5 class="card-header">Create Subscriber</h5>
                                <form @submit.prevent="createSubscriber" class="needs-validation" novalidate>
                                    <div class="form-row">
                                        <div class="col-md-4 mb-3">
                                            <label for="validationTooltip01">Name</label>
                                            <input type="text" class="form-control" v-model="name" placeholder="Name" required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div v-if="apiErrors.name" class="invalid">{{ apiErrors.name[0] }}</div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationTooltipUsername">Username</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="username" placeholder="Username" aria-describedby="validationTooltipUsernamePrepend" required>
                                                <div class="valid-feedback">Looks good!</div>
                                                <div v-if="apiErrors.username" class="invalid">{{ apiErrors.username[0] }}</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationTooltip02">Email</label>
                                            <input type="email" class="form-control" v-model="email" placeholder="Email" required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div v-if="apiErrors.email" class="invalid">{{ apiErrors.email[0] }}</div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationTooltip03">Password</label>
                                            <input type="password" class="form-control" v-model="password" placeholder="Password" required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div v-if="apiErrors.password" class="invalid">{{ apiErrors.password[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-12 mb-3">
                                            <label>Status</label>
                                            <div class="custom-control custom-switch">
                                                <input type="checkbox" class="custom-control-input" id="statusSwitch" v-model="status">
                                                <label class="custom-control-label" for="statusSwitch">{{ status ? 'Active' : 'Inactive' }}</label>
                                            </div>
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

export default {
    data() {
        return {
            name: '',
            username: '',
            email: '',
            password: '',
            status: false, 
            apiErrors: {} 
        };
    },
    methods: {
        createSubscriber() {
            const token = localStorage.getItem('token');

            axios.post('/api/subscribers', {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password,
                status: this.status ? 'active' : 'inactive'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
                this.$router.push('/subscribers');
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    this.apiErrors = error.response.data.errors;
                }
            });
        },

    },
};
</script>
<style>
.invalid {
    color: red;
}
</style>