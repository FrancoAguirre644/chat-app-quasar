<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center" v-if="!otherUserDetails.online" > 
      {{ otherUserDetails.name }} is offline. 
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-input
          v-model="newMessage"
          bg-color="white"
          class="full-width"
          outlined
          rounded
          label="Message"
          dense
        >
          <template v-slot:after>
            <q-btn
              type="submit"
              @click="sendMessage"
              round
              dense
              flat
              icon="send"
              color="white"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";

export default defineComponent({
  name: "ChatPage",
  setup() {
    return {
      newMessage: "",
    };
  },
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("globalState", ["messages", "userDetails"]),
    otherUserDetails() {
      //@ts-ignore
      return this.$store.state.globalState.users[this.$route.params.id as string];
    }
  },
  methods: {
    ...mapActions("globalState", ["firebaseGetMessages"]),
    sendMessage(): void {
      this.messages.push({
        text: this.newMessage,
        from: "me",
      });
    },
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.id);
  },
});
</script>
