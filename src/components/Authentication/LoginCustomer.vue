<template>
  <v-main>
    <v-container fluid fill-height class="">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
          <v-card>
            <v-card-title class="justify-center font-weight-bold text-h6"
              >Selamat datang di Atma Jogja Rental</v-card-title
            >
            <v-card-text class="pt-4">
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                      v-model="password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      counter
                      :rules="passwordRules"
                      required
                      @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-layout justify-center class="mt-4">
                  <v-btn block class="blue darken-1 white--text" @click="submit"
                    >Login</v-btn
                  >
                </v-layout>
                <v-layout justify-center class="mt-2">
                  <div class="caption">
                    Belum punya akun?
                    <a
                      @click="register"
                      class="text-decoration-none"
                      >Register</a
                    >
                  </div>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
          <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
            error_message
          }}</v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
    <v-overlay :value="overlay"><v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular></v-overlay>
  </v-main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      overlay: false,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      password: "",
      passwordRules: [(v) => !!v || "Required"],
      email: "",
      emailRules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // cek validasi data yang terkirim
        this.load = true;
        this.overlay = true;
        this.$http
          .post(this.$api + "/login/customer", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            // simpan data id user yang diinput
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("id_customer", response.data.user.id_customer);
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("user", response.data.user);
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.overlay = false;
            this.clear();
            this.$router.push({
              name: "Customer Profile",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
            this.overlay = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    register() {
      this.$router.push({
        name: "Register Customer",
      });
    },
  },
};
</script>
