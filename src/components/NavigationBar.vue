<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <div class="d-flex">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/subscribers" class="nav-link">Subscribers</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/blogs" class="nav-link">Blogs</router-link>
            </li>
            <li class="nav-item">
              <a @click="logoutAction()" class="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'NavigationBar',
    methods: {
        logoutAction() {
      axios.post('/api/logout', {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then(() => {
          localStorage.setItem('token', "")
          this.$router.push('/')
        })
        .catch((error) => {
          console.error('Error logging out:', error);
        });
    }
    }
  };
  </script>
  