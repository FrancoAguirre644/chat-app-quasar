<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      v-model="formData.name"
      outlined
      type="text"
      label="Name"
    />
    <q-input
      class="q-mb-md"
      v-model="formData.email"
      outlined
      type="email"
      label="Email"
    />
    <q-input
      class="q-mb-md"
      v-model="formData.password"
      outlined
      type="password"
      label="Password"
    />
    <div class="row">
      <q-btn class="full-width" type="submit" color="primary" :label="tab" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "login-register",
  props: ["tab"],
  setup() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
        alert()
    }
  }
});
</script>
