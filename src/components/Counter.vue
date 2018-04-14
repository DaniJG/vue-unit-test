<template>
  <div>
    Counter value: <span class="counter-value">{{ value }}</span>
    <br/>
    <button id="increase-btn" @click="onIncrease">Increase</button>
    <br/>
    <button id="increase-http-btn" @click="onIncreaseFromHttp">Increase from Http response</button>
  </div>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      value: this.initialValue,
    };
  },
  computed: {
    stringValue() {
      return this.value.toString();
    },
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    onNavigate() {
      this.$router.push({ name: 'home' });
    },
    onIncrease() {
      this.value += 1;
      this.$emit('increased', this.value);
    },
    onIncreaseFromHttp() {
      return this.$http.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        this.value += response.data.length;
        this.$emit('increased', this.value);
      });
    },
  },
};
</script>

