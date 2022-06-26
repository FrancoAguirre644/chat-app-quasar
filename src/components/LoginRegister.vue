<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      v-model="name"
      outlined
      type="text"
      label="Name"
      :rules="[
        (val) => !!val || 'Name is required.',
        (val) => val.length >= 3 || 'Please use minimum 3 characters.',
      ]"
    />
    <q-input
      class="q-mb-md"
      v-model="email"
      outlined
      type="email"
      label="Email"
      :rules="[
        (val) => !!val || 'Email is required.',
        'Please use a valid email.', isValidEmail
      ]"
    />
    <q-input
      class="q-mb-md"
      v-model="password"
      outlined
      type="password"
      label="Password"
      autocomplete="off"
      :rules="[
        (val) => !!val || 'Password is required.',
        (val) => val.length >= 8 || 'Please use minimum 8 characters.',
      ]"
    />
    <div class="row">
      <q-btn class="full-width" type="submit" color="primary" :label="tab" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "login-register",
  props: ["tab"],
  setup() {
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);

    return {
      name,
      email,
      password,
    };
  },
  methods: {
    ...mapActions("globalState", ["register", "login"]),
    submitForm() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      if (this.tab == "login") {
        this.login(formData);
      } else {
        this.register(formData);
      }
    },
    isValidEmail(val: string) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Please use a valid email.";
    },
  },
});
</script>
