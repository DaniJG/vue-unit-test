<template>
  <div class="about">
    <h1>This is an about page</h1>
    <counter :initial-value="2" />
    <br/>
    <users />
  </div>
</template>

<script>
// @ is an alias to /src
import Counter from '@/components/Counter.vue';
import Users from '@/components/Users.vue';

export default {
  name: 'home',
  components: {
    Counter,
    Users,
  },
};
</script>
