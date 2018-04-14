<template>
  <div>
    <button @click="onLoadUsers">Load users</button>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{user.name}} - {{user.email}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    onLoadUsers() {
      return axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        this.users = response.data;
      });
    },
  },
};
</script>

