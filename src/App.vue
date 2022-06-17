<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "App",
  methods: {
    ...mapActions("globalState", ["handleAuthStateChanged"]),
  },
  mounted() {
    this.handleAuthStateChanged();
  },
});
</script>
