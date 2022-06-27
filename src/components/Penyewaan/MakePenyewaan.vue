<template>
  <v-main>
    <v-container fluid fill-height class="">
      <v-layout flex align-center justify-center>
        <v-flex elevation-6>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1"> </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2"> </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form v-model="valid" ref="form">
                  <v-container fluid
                    >
                    <v-row>
                    <v-col>
                      <strong> <h4>Mobil Tersedia</h4></strong>
                    </v-col>
                  </v-row>
                    <v-row align="center" justify="center">
                      <v-col
                        v-for="mobil in mobils"
                        :key="mobil.id_mobil"
                        cols="6"
                        class="d-flex justify-center align-center"
                      >
                        <v-card>
                          <v-img
                            :src="mobil.url_foto"
                            class="white--text align-center"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="300px"
                            width="800px"
                            cover
                          >
                          </v-img>

                          <v-card-title
                            class="text-h7"
                            v-text="mobil.nama_mobil"
                          ></v-card-title>
                          <v-card-text class="text-h6">
                            <v-row>
                              <v-col cols="5">
                                <h6>Tipe</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ mobil.tipe_mobil }}</h6>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">
                                <h6>Transmisi</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ mobil.jenis_transmisi }}</h6>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">
                                <h6>Bahan Bakar</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ mobil.jenis_bahan_bakar }}</h6>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">
                                <h6>Warna Mobil</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ mobil.warna_mobil }}</h6>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">
                                <h6>Volume Bagasi</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ mobil.volume_bagasi }}</h6>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">
                                <h6>Fasilitas</h6>
                              </v-col>
                              <v-col cols="7">
                                <h6>:{{ mobil.fasilitas }}</h6>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="5">
                                <h6>Harga Sewa</h6>
                              </v-col>
                              <v-col cols="6">
                                <h6>: Rp.{{ mobil.harga_sewa }}</h6>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-row class="mt-n3">
                              <v-col align="end">
                                <v-btn
                                  color="#1c549c"
                                  text
                                  @click="bookingMobil(mobil)"
                                >
                                  BOOKING
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>

                <!-- <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

            <v-btn text> Cancel </v-btn> -->
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-container fluid>
                  <v-row>
                    <v-col>
                      <strong> <h4>Jenis Penyewaan</h4></strong>
                    </v-col>
                  </v-row>
                  <v-radio-group
                    :rules="[(v) => !!v || 'Item is required']"
                    v-model="jenis_penyewaan"
                    row
                  >
                    <v-col>
                      <v-radio
                        label="Penyewaan Mobil + Driver"
                        value="Penyewaan Mobil + Driver"
                        @click="radioButtonMobilDriver()"
                      ></v-radio>
                    </v-col>
                    <v-col>
                      <v-radio
                        label="Penyewaan Mobil"
                        value="Penyewaan Mobil"
                        @click="radioButtonMobil()"
                      ></v-radio>
                    </v-col>
                  </v-radio-group>
                  <v-row>
                    <v-col>
                      <strong> <h4>Waktu Penyewaan</h4></strong>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col class="d-flex justify-center align-center">
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
                            v-model="tanggal_mulai_sewa"
                            label="Rental Start Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="tanggal_mulai_sewa"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="waktu_sewa"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-model="waktu_sewa"
                          full-width
                          @click:minute="$refs.menu3.save(waktu_sewa)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col class="d-flex justify-center align-center">
                      <v-menu
                        v-model="menu4"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="tanggal_selesai"
                            label="Rental End Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="tanggal_selesai"
                          @input="menu4 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu
                        ref="menu"
                        v-model="menu5"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="waktu_selesai"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu5"
                          v-model="waktu_selesai"
                          full-width
                          @click:minute="$refs.menu.save(waktu_selesai)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row v-if="listDriver">
                    <v-col>
                      <strong> <h4>Driver Tersedia</h4></strong>
                    </v-col>
                  </v-row>
                    <v-row v-if="listDriver">
                      <v-col
                        v-for="driver in drivers"
                        :key="driver.nama"
                        cols="3"
                        class="d-flex justify-center align-center"
                      >
                        <v-card height="200px" width="500px">
                          <v-card-title
                            v-text="driver.nama"
                          ></v-card-title>

                          <v-card-text class="text-h6"
                            ><v-row no-gutters>
                              <v-col cols="5">
                                <h6>Tarif</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ driver.tarif_driver }}</h6>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="5">
                                <h6>Bahasa</h6>
                              </v-col>
                              <v-col cols="7">
                                <h6>:{{ driver.bahasa }}</h6>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="5">
                                <h6>Rating</h6>
                              </v-col>
                              <v-col cols="4">
                                <h6>:{{ driver.rerata_rating }}</h6>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-row no-gutters class="mt-n4">
                              <v-col align="end">
                                <v-btn
                                  color="#1c549c"
                                  text
                                  @click="bookingDriver(driver)"
                                >
                                  BOOKING
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                </v-container>

                <v-btn v-if="btnBookingTanpaDriver" block color="primary" @click="bookingTanpaDriver()"> Continue </v-btn>
            <!-- <v-btn text> Cancel </v-btn> -->
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-col align="center">
                  <v-icon class="text-center" size="50px" dark color="primary"
                    >mdi-check-bold</v-icon
                  ></v-col
                >
                <p class="text-center">Pemesanan Berhasil</p>
                <v-btn block color="primary" @click="finishForm()">
                  Finish
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <v-dialog v-model="dialogConfirm" persistent max-width="400px">
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
    </v-dialog> -->
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-main>
</template>

<script>
import moment from "moment";
export default {
  name: "Profile",
  data() {
    return {
        btnBookingTanpaDriver: false,
        listDriver: false,

      e1: 1,
      showPassword: false,
      overlay: false,
      date: "",
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      dialogConfirm: false,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,

      id_penyewaan: "",
      id_pegawai: "",
      id_customer: "",
      id_driver: "",
      id_mobil: "",
      jenis_penyewaan: "",
      tanggal_mulai_sewa: "",
      tanggal_selesai: "",
      temp_tanggal_mulai_sewa: "",
      temp_tanggal_selesai: "",

      waktu_sewa: "",
      waktu_selesai: "",
      tanggal_pengembalian: "",

      penyewaan: new FormData(),
      mobils: [],
      drivers: [],
      penyewaans: [],
      customers: [],
      pegawais: [],
      promos: [],
      editId: "",
    };
  },
  methods: {
      radioButtonMobil() {
          this.btnBookingTanpaDriver = true;
        this.listDriver = false;
      },
      radioButtonMobilDriver() {
          this.btnBookingTanpaDriver = false;
        this.listDriver = true;
      },
    finishForm() {
      this.$router.push({
        name: "Nota Penyewaan",
      });
    },
    setForm() {
      //if (this.inputType !== "Booking") {
      // this.update();
      //} else {
      this.save();
      //}
      this.e1 = 3;
    },
    readDataMobil() {
      var url = this.$api + "/mobil/showavailable";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.mobils = response.data.data;
        });
    },
    readDataDriver() {
      var url = this.$api + "/keloladata/driver/showavailable";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.drivers = response.data.data;
        });
    },
    readDataCustomer() {
      var url =
        this.$api + "/customer/show/" + localStorage.getItem("id_customer");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.id_customer = response.data.data.id_customer;
          this.fullname = response.data.data.nama;
          this.address = response.data.data.alamat;
          this.date = response.data.data.tanggal_lahir;
          this.gender = response.data.data.jenis_kelamin;
          this.email = response.data.data.email;
          this.password = response.data.data.password;
          this.phone = response.data.data.no_telp;
          this.status_customer = response.data.data.status_customer;
          this.imageStoreURLSim = response.data.data.sim;
          this.imageStoreURLIdentitas = response.data.data.identitas;
        });
    },

    // booking() {
    //   this.e1 = 3;
    //   this.save();
    //   //this.$router.push({
    //   // name: "OrderPage",
    //   // });
    // },

    save() {
      //this.tanggal_mulai_sewa= this.combineDateWithTime(new Date(this.tanggal_mulai_sewa),new Date(this.waktu_sewa));
      //this.tanggal_selesai= this.combineDateWithTime(new Date(this.tanggal_selesai),new Date(this.waktu_selesai));
      //   this.readDataCustomer();
      if (this.tanggal_mulai_sewa !== "") {
        this.temp_tanggal_mulai_sewa = moment(
          this.tanggal_mulai_sewa + " " + this.waktu_sewa + ":00",
          "YYYY-MM-DD hh:mm:ss"
        ).format("YYYY-MM-DD HH:mm:ss");
      }

      if (this.tanggal_selesai !== "") {
        this.temp_tanggal_selesai = moment(
          this.tanggal_selesai + " " + this.waktu_selesai + ":00",
          "YYYY-MM-DD hh:mm:ss"
        ).format("YYYY-MM-DD HH:mm:ss");
      }

      this.penyewaan.append("id_penyewaan", this.id_penyewaan);
      this.penyewaan.append("id_customer", this.id_customer);
      this.penyewaan.append("id_driver", this.id_driver);
      this.penyewaan.append("id_pegawai", this.id_pegawai);
      this.penyewaan.append("id_mobil", this.id_mobil);
      this.penyewaan.append("status_penyewaan", this.status_penyewaan);
      this.penyewaan.append("jenis_penyewaan", this.jenis_penyewaan);
      this.penyewaan.append("tanggal_penyewaan", this.tanggal_penyewaan);
      this.penyewaan.append(
        "tanggal_mulai_sewa",
        this.temp_tanggal_mulai_sewa.toString()
      );
      this.penyewaan.append(
        "tanggal_selesai",
        this.temp_tanggal_selesai.toString()
      );
      this.penyewaan.append("tanggal_pengembalian", this.tanggal_pengembalian);
      this.penyewaan.append("sub_total", this.sub_total);
      this.penyewaan.append("tanggal_pembayaran", this.tanggal_pembayaran);
      this.penyewaan.append("metode_pembayaran", this.metode_pembayaran);
      this.penyewaan.append("total_diskon", this.total_diskon);
      this.penyewaan.append("total_denda", this.total_denda);
      this.penyewaan.append("total_harga_bayar", this.total_harga_bayar);

      this.penyewaan.append("url_bukti_pembayaran", this.imageStoreURL);

      var url = this.$api + "/penyewaan/store";
      this.load = true;
      this.$http
        .post(url, this.penyewaan, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          //   this.readData(); //local data
          this.resetForm();
          this.e1 = 3;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    update() {
      let newData = {
        id_penyewaan: this.id_penyewaan,
        id_customer: this.id_customer,
        id_driver: this.id_driver,
        id_pegawai: this.id_pegawai,
        id_mobil: this.id_mobil,
        jenis_penyewaan: this.jenis_penyewaan,
        tanggal_penyewaan: this.tanggal_penyewaan,
        tanggal_mulai_sewa: this.tanggal_mulai_sewa,
        tanggal_selesai: this.tanggal_selesai,
        tanggal_pengembalian: this.tanggal_pengembalian,
        sub_total: this.sub_total,
        status_penyewaan: this.status_penyewaan,
        tanggal_pembayaran: this.tanggal_pembayaran,
        metode_pembayaran: this.metode_pembayaran,
        total_diskon: this.total_diskon,
        total_denda: this.total_denda,
        total_harga_bayar: this.total_harga_bayar,
        bukti_pembayaran: this.imageStoreURL,
      };
      var url = this.$api + "/penyewaan/update/" + this.editId;
      this.load = true;
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
          this.close();
          //   this.readData(); //local data
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    bookingMobil(mobil) {
      this.id_mobil = mobil.id_mobil;
      this.e1 = 2;
    },
    bookingDriver(driver) {
      this.id_driver = driver.id_driver;
      this.save();
      //this.e1 = 3;
    },
    bookingTanpaDriver() {
        this.save();
    },
    editItem(item) {
      this.inputType = "Edit";
      this.editId = item.id_penyewaan;
      this.id_penyewaan = item.id_penyewaan;
      this.id_customer = item.id_customer;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.status_penyewaan = item.status_penyewaan;
      this.jenis_penyewaan = item.jenis_penyewaan;
      this.tanggal_penyewaan = item.tanggal_penyewaan;
      this.tanggal_mulai_sewa = item.tanggal_mulai_sewa;
      this.tanggal_selesai = item.tanggal_selesai;
      this.tanggal_pengembalian = item.tanggal_pengembalian;
      this.sub_total = item.sub_total;
      this.tanggal_pembayaran = item.tanggal_pembayaran;
      this.metode_pembayaran = item.metode_pembayaran;
      this.total_diskon = item.total_diskon;
      this.total_denda = item.total_denda;
      this.total_harga_bayar = item.total_harga_bayar;
      this.imageStoreURL = item.bukti_pembayaran;
      this.imageUrl = item.bukti_pembayaran;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      //   this.readData();
    },
    cancel() {
      this.resetForm();
      //   this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.id_role = "";
      this.nama = "";
      this.alamat = "";
      this.tanggal_lahir = "";
      this.jenis_kelamin = "";
      this.email = "";
      this.no_telp = "";
      this.password = "";
      this.image = "";
      (this.imageUrl = ""), (this.imageUrl = ""), (this.dialog = false);
    },

    // readData() {
    //   this.overlay = true;
    //   var url =
    //     this.$api + "/customer/show/" + localStorage.getItem("id_customer");
    //   this.$http
    //     .get(url, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then((response) => {
    //       this.status_akun = response.data.data.status_akun;
    //       this.name = response.data.data.nama;
    //       this.alamat = response.data.data.alamat;
    //       this.tanggal_lahir = response.data.data.tanggal_lahir;
    //       this.jeniskelamin = response.data.data.jenis_kelamin;
    //       this.email = response.data.data.email;
    //       this.no_telp = response.data.data.no_telp;
    //       this.url_sim = response.data.data.url_sim;
    //       this.url_kartu_identitas = response.data.data.url_kartu_identitas;
    //       this.load = false;
    //       this.overlay = false;
    //     })
    //     .catch((error) => {
    //       this.error_message = error.response.data.message;
    //       this.color = "red";
    //       this.snackbar = true;
    //       this.load = false;
    //       this.overlay = false;
    //     });
    // },

    // update() {
    //   let newData = {
    //     status_akun: this.status_akun,
    //     nama: this.name,
    //     alamat: this.alamat,
    //     tanggal_lahir: this.tanggal_lahir,
    //     jenis_kelamin: this.jeniskelamin,
    //     email: this.email,
    //     no_telp: this.no_telp,
    //     password: this.password,
    //     url_sim: this.url_sim,
    //     url_kartu_identitas: this.url_kartu_identitas,
    //   };
    //   var url =
    //     this.$api + "/customer/update/" + localStorage.getItem("id_customer");
    //   this.load = true;
    //   this.overlay = true;
    //   this.$http
    //     .put(url, newData, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then((response) => {
    //       this.error_message = response.data.message;
    //       this.color = "green";
    //       this.snackbar = true;
    //       this.load = false;
    //       this.overlay = false;
    //       location.reload();
    //     })
    //     .catch((error) => {
    //       this.error_message = error.response.data.message;
    //       this.color = "red";
    //       this.snackbar = true;
    //       this.load = false;
    //       this.overlay = false;
    //     });
    // },
  },

  mounted() {
    this.readDataMobil();
    this.readDataDriver();
    this.readDataCustomer();
  },
};
</script>
