<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline.
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
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

export default defineComponent({
  name: "ChatPage",
  setup() {
    return {
      newMessage: "",
      messages: [
        {
          text: "Hey, how old are you?",
          from: "me",
        },
        {
          text: "Good thanks, how old are you?",
          from: "them",
        },
        {
          text: "Pretty good!",
          from: "me",
        },
      ],
    };
  },
  methods: {
    sendMessage(): void {
      this.messages.push({
        text: this.newMessage,
        from: "me",
      });
      console.log(this.messages);
    },
  },
});
</script>
