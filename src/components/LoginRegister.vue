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
      autocomplete="off"
    />
    <div class="row">
      <q-btn class="full-width" type="submit" color="primary" :label="tab" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

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
    ...mapActions("globalState", ["register", "login"]),
    submitForm() {
      if (this.tab == "login") {
        this.login(this.formData);
      } else {
        this.register(this.formData);
      }
    }
  },
});
</script>
