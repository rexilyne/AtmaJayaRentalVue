<template>
    <div>
        <v-app-bar app fixed clipped-left height="90" color="blue darken-4" elevation="4">
                    <div role="button" class="text-h6 font-weight-bold yellow--text" @click="home">
                        Atma Jogja Rental
                    </div>
                    <v-spacer></v-spacer>

                    <!-- <v-btn class="mr-3" outlined color="white" @click="register">Register</v-btn> -->
                    <v-btn class="" outlined color="white" @click="login">Login</v-btn>

            <!-- <v-app-bar-title>TokoLaku.id</v-app-bar-title> -->
            <!-- <v-spacer> -->
        </v-app-bar>
        <div class="pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                images: {
                    logo: require('@/assets/logo_ajr_trans.png')
                }
            };
        },
        methods: {
            home() {
                this.$router.push({
                    name: 'Welcome',
                }).catch(error => {
  if (error.name != "NavigationDuplicated") {
    throw error;
  }
});
            },

            // register() {
            //     this.$router.push({
            //         name: 'Register',
            //     });
            // },

            login() {
                this.$router.push({
                    name: 'Choose Login',
                });
            }
        }
    }
</script>