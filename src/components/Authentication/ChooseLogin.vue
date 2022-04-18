<template>
  <v-main>
    <v-container fluid fill-height class="">
      <v-row>
          <v-col>
              <v-card hover rounded="lg" height="25%">
                  <v-card-title class="justify-center font-weight-bold text-h6">Customer</v-card-title>
                  <v-icon color="blue">
                      mdi-account
                  </v-icon>
                  <v-btn
                    outlined
                    @click="loginCustomer"
                  >
                    Login
                  </v-btn>
                  <v-btn
                    outlined
                    @click="registerCustomer"
                  >
                    Register
                  </v-btn>
              </v-card>
          </v-col>
          <v-col>
              <v-card hover rounded="lg" height="25%">
                  <v-card-title class="justify-center font-weight-bold text-h6">Pegawai</v-card-title>
                  <v-icon color="orange">
                      mdi-account
                  </v-icon>
                  <v-btn
                    outlined
                    @click="loginPegawai"
                  >
                    Login
                  </v-btn>
                  <!-- <v-btn
                    outlined
                  >
                    Register
                  </v-btn> -->
              </v-card>
          </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Choose Login",
  methods: {
    loginCustomer() {
      this.$router.push({
        name: "Login Customer",
      });
    },

    registerCustomer() {
      this.$router.push({
        name: "Register Customer",
      });
    },

    loginPegawai() {
      this.$router.push({
        name: "Login Pegawai",
      });
    },
  },
};
</script>
