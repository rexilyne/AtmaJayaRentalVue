<template>
  <v-main>
    <v-container fluid fill-height class="">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
          <v-card>
            <v-card-title class="justify-center font-weight-bold text-h6"
              >Data Profile</v-card-title
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
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="tanggal_lahir"
                        @input="menu2 = false"
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
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      counter
                      :rules="passwordRules"
                      required
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-card>
                      <v-img :src="url_sim" class="grey darken-4"></v-img>
                      <v-card-title class="text-h6"> SIM </v-card-title>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <v-img
                        :src="url_kartu_identitas"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="text-h6">
                        Kartu Identitas
                      </v-card-title>
                    </v-card>
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

                <v-layout justify-end class="mt-4">
                  <v-btn text class="blue--text mr-2" @click="update"
                    >Update</v-btn
                  >
                  <v-btn text class="red--text" @click="deleteHandler"
                    >Delete</v-btn
                  >
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
    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text> Anda yakin ingin menghapus user ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-main>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      showPassword: false,
      overlay: false,
      date: "",
      menu2: false,
      image_SIM: undefined,
      image_kartu_identitas: undefined,
      b64_sim: "",
      b64_kartu_identitas: "",
      imageStoreURL_SIM: "",
      imageStoreURL_kartu_identitas: "",
      dialogConfirm: false,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      status_akun: "",
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
      name: "",
      nameRules: [(v) => !!v || "Required"],
      password: "",
      passwordRules: [(v) => !!v || "Required"],
      email: "",
      emailRules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    readData() {
      this.overlay = true;
      var url =
        this.$api + "/customer/show/" + localStorage.getItem("id_customer");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.status_akun = response.data.data.status_akun;
          this.name = response.data.data.nama;
          this.alamat = response.data.data.alamat;
          this.tanggal_lahir = response.data.data.tanggal_lahir;
          this.jeniskelamin = response.data.data.jenis_kelamin;
          this.email = response.data.data.email;
          this.no_telp = response.data.data.no_telp;
          this.url_sim = response.data.data.url_sim;
          this.url_kartu_identitas = response.data.data.url_kartu_identitas;
          this.load = false;
          this.overlay = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.overlay = false;
        });
    },

    update() {
      let newData = {
        status_akun: this.status_akun,
        nama: this.name,
        alamat: this.alamat,
        tanggal_lahir: this.tanggal_lahir,
        jenis_kelamin: this.jeniskelamin,
        email: this.email,
        no_telp: this.no_telp,
        password: this.password,
        url_sim: this.url_sim,
        url_kartu_identitas: this.url_kartu_identitas,
      };
      var url =
        this.$api + "/customer/update/" + localStorage.getItem("id_customer");
      this.load = true;
      this.overlay = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.overlay = false;
          location.reload();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.overlay = false;
        });
    },

    deleteData() {
      var url =
        this.$api + "/customer/delete/" + localStorage.getItem("id_customer");
      this.load = true;
      this.overlay = true;
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.overlay = false;
          this.$router.push({
            name: "Welcome",
          });
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.overlay = false;
        });
    },
    deleteHandler() {
      this.dialogConfirm = true;
    },

    createImageSIM(file) {
      const readerSIM = new FileReader();

      readerSIM.onloadend = (e) => {
        this.b64_sim = e.target.result;
        this.getImageStorageURL_SIM(this.b64_sim);
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
        this.b64_kartu_identitas = e.target.result;
        this.getImageStorageURL_kartu_identitas(this.b64_kartu_identitas);
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
          this.url_sim = response.data.data;
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
          this.url_kartu_identitas = response.data.data;
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

  mounted() {
    this.readData();
  },
};
</script>
