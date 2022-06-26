<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          icon="arrow_back"
          to="/"
          flat
          rounded
          label="Back"
        />

        <q-toolbar-title class="absolute-center"> Chat App </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          class="absolute-right"
          icon="account_circle"
          to="/auth"
          flat
          rounded
        />
        <q-btn
          v-else
          @click="logout"
          class="absolute-right"
          icon="logout"
          flat
          rounded
          :label="userDetails.name"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    ...mapState("globalState", ["userDetails"]),
  },
  methods: {
    ...mapActions("globalState", ["logout"]),
  }
});
</script>
