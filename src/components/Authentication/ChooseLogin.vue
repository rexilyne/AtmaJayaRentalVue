<template>
  <v-main>
    <v-container fluid fill-height class="">
      <v-row>
        <v-col>
          <v-card rounded="lg" height="100%" class="pa-10">
            <v-card-title class="justify-center font-weight-bold text-h6"
              >Customer</v-card-title
            >
            <v-row>
              <v-col class="d-flex justify-center align-center">
                <v-icon x-large color="blue"> mdi-account </v-icon>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex justify-center align-center pa-2">
                <v-btn
                  block
                  color="blue"
                  class="white--text"
                  @click="loginCustomer"
                >
                  Login
                </v-btn>
              </v-col>
              <v-col class="d-flex justify-center align-center pa-2">
                <v-btn block color="blue" outlined @click="registerCustomer">
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card rounded="lg" height="100%" class="pa-10">
            <v-card-title class="justify-center font-weight-bold text-h6"
              >Pegawai</v-card-title
            >
            <v-row>
              <v-col class="d-flex justify-center align-center">
                <v-icon x-large color="orange"> mdi-account </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center align-center pa-2">
                <v-btn
                  block
                  color="blue"
                  class="white--text"
                  @click="loginPegawai"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
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
  name: "ChooseLogin",
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
