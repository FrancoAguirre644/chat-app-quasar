import { IUser } from "src/components/models";

export default {
    computed: {
        otherUserDetails(): IUser {
            //@ts-ignore
            return this.$store.state.globalState.users[this.$route.params.id as string];
        }
    },
}