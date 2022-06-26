<template>
  <q-page ref="pageChat" class="page-chat flex column">
    <q-banner class="bg-grey-4 text-center" v-if="!otherUserDetails.online">
      {{ otherUserDetails.name }} is offline.
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'white' : 'light-green-2'"
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
          placeholder="Message"
          dense
        >
          <template v-slot:after>
            <q-btn
              type="submit"
              @click="sendMessage"
              @keyup.enter="sendMessage"
              :disable="newMessage == '' ? true : false"
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
import { defineComponent, ref } from "vue";
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";

export default defineComponent({
  name: "ChatPage",
  setup() {
    const newMessage = ref("");

    return {
      newMessage,
      showMessages: false
    };
  },
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("globalState", ["messages", "userDetails"]),
  },
  methods: {
    ...mapActions("globalState", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage",
    ]),
    sendMessage(): void {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: "me",
        },
        otherUserId: this.$route.params.id,
      });

      this.newMessage = "";
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.id);
  },
  unmounted() {
    this.firebaseStopGettingMessages();
  },
});
</script>

<style lang="scss">
  .page-chat {
    background: #e2dfd5;
    &::after {
      content: '';
      display: block;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
      opacity: 0.1;
      background-color:silver;
      background-image:
      radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
      radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
      radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
      background-size: 100px 50px;
    }
  }
  .q-message {
    z-index: 1;
  }
</style>