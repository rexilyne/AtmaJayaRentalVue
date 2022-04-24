<template>
  <v-main>
    <v-container fluid fill-height class="">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
          <v-card>
            <v-card-title class="justify-center font-weight-bold text-h6"
              >Mari bergabung dengan Atma Jaya Rental</v-card-title
            >
            <v-card-text class="pt-4">
              <v-form v-model="valid" ref="form">
                <!-- <v-row>
                  <v-col align="center">
                    <v-avatar size="96">
                      <img :src="url_foto" />
                    </v-avatar>
                  </v-col>
                </v-row> -->
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Nama"
                      v-model="name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Alamat"
                      v-model="alamat"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="tanggal_lahir"
                          label="Tanggal Lahir"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          @change="setPassword"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="tanggal_lahir"
                        @input="menu2 = false"
                        @change="setPassword"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="jeniskelamin"
                      :items="jeniskelamins"
                      item-value="gender"
                      item-text="gender"
                      label="Jenis Kelamin"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      label="E-mail"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Nomor Telepon"
                      v-model="no_telp"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      type="password"
                      :rules="passwordRules"
                      hint="Tanggal Lahir (YYYY-mm-dd)"
                      persistent-hint
                      readonly
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-file-input
                      v-model="image_SIM"
                      type="file"
                      class="input"
                      label="Upload SIM"
                      hint="Upload SIM"
                      outlined
                      dense
                      @change="onFileChangeSIM"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-file-input
                      v-model="image_kartu_identitas"
                      type="file"
                      class="input"
                      label="Upload Kartu Identitas"
                      hint="Upload Kartu Identitas"
                      outlined
                      dense
                      @change="onFileChangeKartuIdentitas"
                    />
                  </v-col>
                </v-row>

                <v-layout justify-center class="mt-4">
                  <v-btn block class="blue darken-1 white--text" @click="submit"
                    >Register</v-btn
                  >
                </v-layout>
                <v-layout justify-center class="mt-2">
                  <div class="caption">
                    Sudah punya akun?
                    <a
                      @click="login"
                      class="text-decoration-none"
                      >Login</a
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
  name: "Register",
  data() {
    return {
      overlay: false,
      date: "",
      menu2: false,
      image_SIM: undefined,
      image_kartu_identitas: undefined,
      imageStoreURL_SIM: "",
      imageStoreURL_kartu_identitas: "",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      name: "",
      alamat: "",
      tanggal_lahir: "",
      no_telp: "",
      url_sim: "",
      url_kartu_identitas: "",
      jeniskelamin: "Laki-laki",
      jeniskelamins: [
        {
          id: 1,
          gender: "Laki-laki",
        },
        {
          id: 2,
          gender: "Perempuan",
        },
      ],
      nameRules: [(v) => !!v || "Required"],
      password: "",
      passwordRules: [(v) => !!v || "Required"],
      email: "",
      emailRules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    setPassword() {
      this.password = this.tanggal_lahir;
    },
    submit() {
      this.overlay = true;
      if (this.$refs.form.validate()) {
        // cek validasi data yang terkirim
        this.load = true;
        this.$http
          .post(this.$api + "/register/customer", {
            nama: this.name,
            alamat: this.alamat,
            tanggal_lahir: this.tanggal_lahir,
            jenis_kelamin: this.jeniskelamin,
            no_telp: this.no_telp,
            email: this.email,
            password: this.password,
            url_sim: this.imageStoreURL_SIM,
            url_kartu_identitas: this.imageStoreURL_kartu_identitas
          })
          .then((response) => {
            // simpan data id user yang diinput
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.overlay = false;
            this.clear();
            this.$router.push({
              name: "Login Customer",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
            this.overlay = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    login() {
      this.$router.push({
        name: "Login Customer",
      });
    },
    createImageSIM(file) {
      const readerSIM = new FileReader();

      readerSIM.onloadend = (e) => {
        this.url_sim = e.target.result;
        this.getImageStorageURL_SIM(this.url_sim);
      };
      
      readerSIM.readAsDataURL(file);
    },
    onFileChangeSIM(file) {
      if (!file) {
        return;
      }
      this.createImageSIM(file);
    },
    createImageKartuIdentitas(file) {
      const readerKartuIdentitas = new FileReader();

      readerKartuIdentitas.onloadend = (e) => {
        this.url_kartu_identitas = e.target.result;
        this.getImageStorageURL_kartu_identitas(this.url_kartu_identitas);
      };
      
      readerKartuIdentitas.readAsDataURL(file);
    },
    onFileChangeKartuIdentitas(file) {
      if (!file) {
        return;
      }
      this.createImageKartuIdentitas(file);
    },
    getImageStorageURL_SIM(img_url) {
      this.overlay = true;
      let newData = {
        imgB64: img_url,
      };
      var url = this.$api + "/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURL_SIM = response.data.data;
          this.overlay = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.overlay = false;
        });
    },
    getImageStorageURL_kartu_identitas(img_url) {
      this.overlay = true;
      let newData = {
        imgB64: img_url,
      };
      var url = this.$api + "/storeimage";
      this.$http
        .post(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.imageStoreURL_kartu_identitas = response.data.data;
          this.overlay = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.overlay = false;
        });
    },
  },
};
</script>
