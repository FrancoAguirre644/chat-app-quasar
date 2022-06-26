import { IUser } from "src/components/models";
import { defineComponent } from "vue";

export default defineComponent({
    computed: {
        otherUserDetails(): IUser {

            if(this.$store.state.globalState.users[this.$route.params.id as string]) {
                //@ts-ignore
                return this.$store.state.globalState.users[this.$route.params.id as string];
            }
            
            return {};
        }
    },
});