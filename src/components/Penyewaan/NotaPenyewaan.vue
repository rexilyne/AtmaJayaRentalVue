<template>
  <v-main>

    <v-card class="ma-12">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <!-- <v-btn color="#e8aa09" text-dark @click="dialog = true"> Tambah </v-btn> -->
      </v-card-title>
      <v-data-table :headers="headers" :items="penyewaans" :search="search">
        <template v-slot:[`item.bukti_pembayaran`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.bukti_pembayaran"
              height="50px"
              width="50px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-icon
            aria-label="update"
            role="button"
            aria-hidden="false"
            color="green"
            small
            class="mr-1"
            @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon
            aria-label="delete"
            role="button"
            aria-hidden="false"
            color="red"
            small
            class="ml-1"
            @click="deleteItem(item.id_penyewaan)"
            >mdi-delete
          </v-icon> -->

          <v-btn
            small
            color="red"
            text-dark
            class="mr-2"
            width="20%"
            @click="dialogReturnMobil(item)"
            >Return</v-btn
          >
          <v-btn
            small
            aria-label="update"
            color="green"
            text-dark
            class="mr-2"
            width="20%"
            @click="editItem(item)"
            >Payment</v-btn
          >
          <v-btn
            small
            color="blue"
            text-dark
            class="mr-2"
            width="20%"
            @click="showRecipient(item)"
            >Receipt</v-btn
          >

          <v-btn
            small
            color="yellow"
            text-dark
            class="mr-2"
            width="20%"
            @click="editItem2(item)"
            >Rating</v-btn
          >
        </template>
        <!--<template v-slot:[`item.priority`]="{ item }">
                  <v-icon role="button" @click="priorityItem(item)">mdi-information</v-icon>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" v-if="item.priority == 'Penting'" class="red">
                    {{ item.note }}
                </td>
                <td :colspan="headers.length" v-if="item.priority == 'Tidak penting'" class="blue">
                    {{ item.note }}
                </td>
                <td :colspan="headers.length" v-if="item.priority == 'Biasa'" class="green">
                    {{ item.note }}
                </td>
              </template> -->
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogRating" max-width="50%">
      <v-card
    class="elevation-16 mx-auto"
  >
    <v-card-title class="text-h5">
      Rating Driver dan Rental
    </v-card-title>
    <v-card-text>
      Terima kasih sudah melakukan penyewaan mobil di rental kami, masukan anda akan sangat berguna bagi 
      <div class="text-center mt-3">
        <b>Driver</b>
      </div>
      <div class="text-center mt-3">
        <v-rating
          v-model="ratingDriver"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
        ></v-rating>
      </div>
      <div class="text-center mt-3">
        <v-textarea
        v-model="performaDriver"
        label="Performa Driver"></v-textarea>
      </div>

      <div class="text-center mt-3">
        <b>Rental</b>
      </div>
      <div class="text-center mt-3">
        <v-rating
          v-model="ratingRental"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
        ></v-rating>
      </div>
      <div class="text-center mt-3">
        <v-textarea
        v-model="performaPerusahaan"
        label="Performa Perusahaan"></v-textarea>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn text @click="dialogRating=false">
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        text
        @click="updateRating"
      >
        Beri Rating
      </v-btn>
    </v-card-actions>
  </v-card>  
    </v-dialog>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <!--<span class="headline">{{ formTitle }} penyewaan</span> -->
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-card color="white" class="mx-14" width="400px" elevation="7">
              <v-card-title class="justify-center">
                Nota Pembayaran
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="mb-1">
                    <h6>{{ id_penyewaan }}</h6>
                  </v-col>
                  <v-col cols="6" class="mb-1">
                    <h6>{{ tanggal_penyewaan }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>Customer</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ nama_customer }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>CS</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ nama_pegawai }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="7">
                    <h6>Driver</h6>
                  </v-col>
                  <v-col cols="5">
                    <h6>{{ nama_driver }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>tanggal Mulai</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tanggal_mulai_sewa }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>tanggal Selesai</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tanggal_selesai }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>tanggal Pengembalian</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tanggal_pengembalian }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Item</strong></h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="ms-2">
                    <h6>{{ nama_mobil }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>{{ nama_driver }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>SubTotal</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_harga_sewa }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Denda</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_denda }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Promo</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_diskon }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="mb-3">
                    <h6><strong>Total</strong></h6>
                  </v-col>
                  <v-col cols="6" class="mb-3">
                    <h6>{{ total_harga_bayar }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-row no-gutters class="ms-3">
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="6" class="mb-10"> </v-col>
              <v-col cols="4"> </v-col>
            </v-row>
            <v-select
              class="mx-14"
              v-model="metode_pembayaran"
              :items="metode_bayar"
              item-value="metode"
              item-text="metode"
              label="Metode Pembayaran"
              outlined
              dense
              max-width="10px"
              required
            />

            <v-select
              class="mx-14"
              v-model="choose_promo"
              :items="promos"
              item-value="id_promo"
              item-text="jenis_promo"
              label="Promo"
              outlined
              dense
              max-width="10px"
              required
            />
            <v-row>
              <v-col>
                <v-card>
                  <v-img :src="url_foto" class="grey darken-4"></v-img>
                  <v-card-title class="text-h6"> Foto Bukti Pembayaran </v-card-title>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-file-input
                  v-model="image"
                  type="file"
                  class="input"
                  label="Upload Foto"
                  hint="Upload Foto"
                  outlined
                  dense
                  @change="onFileChange"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialogRecipient" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <!--<span class="headline">{{ formTitle }} penyewaan</span> -->
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-card color="white" class="mx-14" width="400px" elevation="7">
              <v-card-title class="justify-center">
                Nota Pembayaran
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="mb-1">
                    <h6>{{ id_penyewaan }}</h6>
                  </v-col>
                  <v-col cols="6" class="mb-1">
                    <h6>{{ tanggal_penyewaan }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>Customer</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ nama_customer }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>CS</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ nama_pegawai }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="7">
                    <h6>Driver</h6>
                  </v-col>
                  <v-col cols="5">
                    <h6>{{ nama_driver }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>tanggal Mulai</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tanggal_mulai_sewa }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>tanggal Selesai</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tanggal_selesai }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>tanggal Pengembalian</h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ tanggal_pengembalian }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Item</strong></h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="ms-2">
                    <h6>{{ nama_mobil }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6>{{ nama_driver }}</h6>
                  </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>SubTotal</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_harga_sewa }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Denda</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_denda }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6">
                    <h6><strong>Promo</strong></h6>
                  </v-col>
                  <v-col cols="6">
                    <h6>{{ total_diskon }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
                <v-row no-gutters class="ms-3">
                  <v-col cols="6" class="mb-3">
                    <h6><strong>Total</strong></h6>
                  </v-col>
                  <v-col cols="6" class="mb-3">
                    <h6>{{ total_harga_bayar }}</h6>
                  </v-col>
                  <v-col cols="4"> </v-col>
                </v-row>
              </v-card-text>
            </v-card>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="cancel"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin mengembalikan mobil ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="green" text @click="returnMobil"> Confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "OrderPage",
  data() {
    return {
      dialogRating: false,
      ratingDriver: "",
      performaDriver: "",
      ratingRental: "",
      performaRental: "",
      image: undefined,
      // to save image url
      imageUrl: "",
      inputType: "Pembayaran",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogRecipient: false,
      dialogConfirm: false,
      id_penyewaan: "",
      id_pegawai: "",
      id_customer: "",
      id_driver: "",
      id_mobil: "",
      choose_promo: "",

        tanggal_penyewaan: "",
        tanggal_mulai_sewa: "",
        tanggal_selesai: "",
        tanggal_pengembalian: "",

        nama_driver: "",
        nama_mobil: "",
        nama_pegawai: "",
        nama_customer: "",

      imageStoreURL: "",
      b64_foto: "",
      url_foto: "",
      headers: [
        {
          text: "ID penyewaan",
          align: "start",
          sortable: true,
          value: "id_penyewaan",
        },
        //{ text: "ID Pegawai", value: "id_pegawai" },
        //{ text: "ID Driver", value: "id_driver" },
        //{ text: "ID Customer", value: "id_customer" },
        //{ text: "ID Mobil", value: "id_mobil" },
        //{ text: "Jenis Penyewaan", value: "jenis_penyewaan" },
        //{ text: "tanggal penyewaan", value: "tanggal_penyewaan" },
        { text: "tanggal Mulai Sewa", value: "tanggal_mulai_sewa" },
        { text: "tanggal Selesai Sewa", value: "tanggal_selesai" },
        //{ text: "tanggal Pengembalian", value: "tanggal_pengembalian" },
        //{ text: "Sub Total", value: "total_harga_sewa" },
        { text: "Status Penyewaan", value: "status_penyewaan" },
        //{ text: "tanggal Pembayaran", value: "tanggal_pembayaran" },
        { text: "Metode Pembayaran", value: "metode_pembayaran" },
        //{ text: "Total Diskon", value: "total_diskon" },
        //{ text: "Total Denda", value: "total_denda" },
        //{ text: "Total Bayar", value: "total_harga_bayar" },
        { text: "Bukti Pembayaran", value: "bukti_pembayaran" },
        { text: "Rating Driver", value: "rating_driver" },
        { text: "Performa Driver", value: "performa_driver" },
        { text: "Rating Rental", value: "rating_perusahaan" },
        { text: "Performa Rental", value: "performa_perusahaan" },
        { text: "Actions", value: "actions" },
      ],
      penyewaan: new FormData(),
      penyewaans: [],
      customers: [],
      drivers: [],
      pegawais: [],
      mobils: [],
      promos: [],
      deleteId: "",
      editId: "",
      returnId: "",
      metode_bayar: [
        { id: 1, metode: "Transfer" },
        { id: 2, metode: "Cash" },
      ],
      metode_pembayaran: "",
      images: {
        logo: require("@/assets/logo.png"),
      },

      total_harga_bayar: "",
      total_diskon: "",
      total_denda: "",
      total_harga_sewa: "",
    };
  },

  methods: {
    setForm() {
      if (this.inputType == "Edit") {
        this.update();
      } else {
        this.returnMobil();
      } 
    },
    //Read Data Courses
    readData() {
      var url =
        this.$api + "/customer/show/" + localStorage.getItem("id_customer");
      var urlpromo = this.$api + "/promo/showactive"
      var urlpenyewaan =
        this.$api +
        "/penyewaan/show/nota/idcustomer/" +
        localStorage.getItem("id_customer");

      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.customers = response.data.data;
          return this.$http.get(urlpromo, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        })
        .then((response) => {
          this.promos = response.data.data;
          return this.$http.get(urlpenyewaan, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        })
        .then((response) => {
          this.penyewaans = response.data.data;
          this.metode_pembayaran = response.data.data.metode_pembayaran;
          this.nama_driver = response.data.data.nama_driver;
          this.nama_mobil = response.data.data.nama_mobil;
          this.nama_pegawai = response.data.data.nama_pegawai;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    // Save data course
    save() {
      this.penyewaan.append("id_penyewaan", this.id_penyewaan);
      this.penyewaan.append("id_customer", this.id_customer);
      this.penyewaan.append("id_driver", this.id_driver);
      this.penyewaan.append("id_pegawai", this.id_pegawai);
      this.penyewaan.append("id_mobil", this.id_mobil);
      this.penyewaan.append("status_penyewaan", this.status_penyewaan);
      this.penyewaan.append("jenis_penyewaan", this.jenis_penyewaan);
      this.penyewaan.append("tanggal_penyewaan", this.tanggal_penyewaan);
      this.penyewaan.append("tanggal_mulai_sewa", this.tanggal_mulai_sewa);
      this.penyewaan.append("tanggal_selesai", this.tanggal_selesai);
      this.penyewaan.append("tanggal_pengembalian", this.tanggal_pengembalian);
      this.penyewaan.append("total_harga_sewa", this.total_harga_sewa);
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
          this.readData(); //local data
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    dialogReturnMobil(item) {
    this.returnId = item.id_penyewaan;
      this.dialogConfirm = true;
    },
    // update data course
    returnMobil(){
      var url = this.$api + "/penyewaan/returnmobil/" + this.returnId;
      var url1 = this.$api + "/penyewaan/hitungtotalharga/" + this.returnId;
      this.load = true;
      this.$http
        .put(url, {
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
          this.readData(); //local data
          this.resetForm();

          //this.inputType = "Pembayaran";
          return this.$http.put(url1, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }});
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); //local data
        //   this.resetForm();
          //this.inputType = "Pembayaran";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.dialogConfirm = false;
        });
    },


    // update data course

    update() {
      let newData = {
        id_penyewaan: this.id_penyewaan,
        id_customer: this.id_customer,
        id_driver: this.id_driver,
        id_pegawai: this.id_pegawai,
        id_mobil: this.id_mobil,
        id_promo: this.choose_promo,
        jenis_penyewaan: this.jenis_penyewaan,
        tanggal_penyewaan: this.tanggal_penyewaan,
        tanggal_mulai_sewa: this.tanggal_mulai_sewa,
        tanggal_selesai: this.tanggal_selesai,
        tanggal_pengembalian: this.tanggal_pengembalian,
        total_harga_sewa: this.total_harga_sewa,
        status_penyewaan: this.status_penyewaan,
        tanggal_pembayaran: this.tanggal_pembayaran,
        metode_pembayaran: this.metode_pembayaran,
        total_diskon: this.total_diskon,
        total_denda: this.total_denda,
        total_harga_bayar: this.total_harga_bayar,
        url_bukti_pembayaran: this.imageStoreURL,
       rating_driver: this.rating_driver,
       performa_driver: this.performa_driver,
       rating_perusahaan: this.rating_perusahaan,
        performa_perusahaan: this.performa_perusahaan
      };
      var url = this.$api + "/penyewaan/update/" + this.editId;
      var url1 = this.$api + "/penyewaan/hitungtotalharga/" + this.editId;
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
          this.readData(); //local data
        //   this.resetForm();
          this.inputType = "Tambah";
        return this.$http.put(url1, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }});
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); //local data
        //   this.resetForm();
          //this.inputType = "Pembayaran";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    updateRating() {
      let newData = {
        id_penyewaan: this.id_penyewaan,
        id_customer: this.id_customer,
        id_driver: this.id_driver,
        id_pegawai: this.id_pegawai,
        id_mobil: this.id_mobil,
        id_promo: this.choose_promo,
        jenis_penyewaan: this.jenis_penyewaan,
        tanggal_penyewaan: this.tanggal_penyewaan,
        tanggal_mulai_sewa: this.tanggal_mulai_sewa,
        tanggal_selesai: this.tanggal_selesai,
        tanggal_pengembalian: this.tanggal_pengembalian,
        total_harga_sewa: this.total_harga_sewa,
        status_penyewaan: this.status_penyewaan,
        tanggal_pembayaran: this.tanggal_pembayaran,
        metode_pembayaran: this.metode_pembayaran,
        total_diskon: this.total_diskon,
        total_denda: this.total_denda,
        total_harga_bayar: this.total_harga_bayar,
        url_bukti_pembayaran: this.imageStoreURL,
       rating_driver: this.ratingDriver,
       performa_driver: this.performaDriver,
       rating_perusahaan: this.ratingRental,
        performa_perusahaan: this.performaPerusahaan
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
          this.readData(); //local data
        //   this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    //delete data course
    deleteData() {
      var url = this.$api + "/penyewaan/delete/" + this.deleteId;
      this.load = true;
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
          this.close();
          this.readData(); //local data
          this.resetForm();
          this.inputType = "Pembayaran";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    editItem(item) {
      this.inputType = "Edit";
      this.editId = item.id_penyewaan;
      this.nama_customer = item.nama_customer;
      this.nama_driver = item.nama_driver;
      this.nama_mobil = item.nama_mobil;
      this.nama_pegawai = item.nama_pegawai;
      this.id_penyewaan = item.id_penyewaan;
      this.id_customer = item.id_customer;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.id_promo = item.id_promo;
      this.status_penyewaan = item.status_penyewaan;
      this.jenis_penyewaan = item.jenis_penyewaan;
      this.tanggal_penyewaan = item.tanggal_penyewaan;
      this.tanggal_mulai_sewa = item.tanggal_mulai_sewa;
      this.tanggal_selesai = item.tanggal_selesai;
      this.tanggal_pengembalian = item.tanggal_pengembalian;
      this.total_harga_sewa = item.total_harga_sewa;
      this.tanggal_pembayaran = item.tanggal_pembayaran;
      this.metode_pembayaran = item.metode_pembayaran;
      this.total_diskon = item.total_diskon;
      this.total_denda = item.total_denda;
      this.total_harga_bayar = item.total_harga_bayar;
      this.rating_driver = item.rating_driver;
      this.performa_driver = item.performa_driver;
      this.rating_perusahaan = item.rating_perusahaan;
      this.performa_perusahaan = item.performa_perusahaan;
      this.imageStoreURL = item.url_bukti_pembayaran;
      this.imageUrl = item.url_bukti_pembayaran;
      this.url_foto = item.url_bukti_pembayaran;
      this.dialog = true;
    },

    editItem2(item) {
      this.inputType = "Edit";
      this.editId = item.id_penyewaan;
      this.nama_customer = item.nama_customer;
      this.nama_driver = item.nama_driver;
      this.nama_mobil = item.nama_mobil;
      this.nama_pegawai = item.nama_pegawai;
      this.id_penyewaan = item.id_penyewaan;
      this.id_customer = item.id_customer;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.id_promo = item.id_promo;
      this.status_penyewaan = item.status_penyewaan;
      this.jenis_penyewaan = item.jenis_penyewaan;
      this.tanggal_penyewaan = item.tanggal_penyewaan;
      this.tanggal_mulai_sewa = item.tanggal_mulai_sewa;
      this.tanggal_selesai = item.tanggal_selesai;
      this.tanggal_pengembalian = item.tanggal_pengembalian;
      this.total_harga_sewa = item.total_harga_sewa;
      this.tanggal_pembayaran = item.tanggal_pembayaran;
      this.metode_pembayaran = item.metode_pembayaran;
      this.total_diskon = item.total_diskon;
      this.total_denda = item.total_denda;
      this.total_harga_bayar = item.total_harga_bayar;
      this.rating_driver = item.rating_driver;
      this.performa_driver = item.performa_driver;
      this.rating_perusahaan = item.rating_perusahaan;
      this.performa_perusahaan = item.performa_perusahaan;
      this.imageStoreURL = item.url_bukti_pembayaran;
      this.imageUrl = item.url_bukti_pembayaran;
      this.url_foto = item.url_bukti_pembayaran;
      this.dialogRating = true;
    },

    showRecipient(item) {
      this.inputType = "Edit";
      this.editId = item.id_penyewaan;
      this.nama_customer = item.nama_customer;
      this.nama_driver = item.nama_driver;
      this.nama_mobil = item.nama_mobil;
      this.nama_pegawai = item.nama_pegawai;
      this.id_penyewaan = item.id_penyewaan;
      this.id_customer = item.id_customer;
      this.id_driver = item.id_driver;
      this.id_mobil = item.id_mobil;
      this.id_pegawai = item.id_pegawai;
      this.id_promo = item.id_promo;
      this.status_penyewaan = item.status_penyewaan;
      this.jenis_penyewaan = item.jenis_penyewaan;
      this.tanggal_penyewaan = item.tanggal_penyewaan;
      this.tanggal_mulai_sewa = item.tanggal_mulai_sewa;
      this.tanggal_selesai = item.tanggal_selesai;
      this.tanggal_pengembalian = item.tanggal_pengembalian;
      this.total_harga_sewa = item.total_harga_sewa;
      this.tanggal_pembayaran = item.tanggal_pembayaran;
      this.metode_pembayaran = item.metode_pembayaran;
      this.total_diskon = item.total_diskon;
      this.total_denda = item.total_denda;
      this.total_harga_bayar = item.total_harga_bayar;
      this.rating_driver = item.rating_driver;
      this.performa_driver = item.performa_driver;
      this.rating_perusahaan = item.rating_perusahaan;
      this.performa_perusahaan = item.performa_perusahaan;
      this.imageStoreURL = item.url_bukti_pembayaran;
      this.imageUrl = item.url_bukti_pembayaran;
      this.url_foto = item.url_bukti_pembayaran;
      this.dialogRecipient = true;
    },

    deleteItem(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.dialogRecipient = false;
      this.inputType = "Pembayaran";
      this.dialogConfirm = false;
      this.dialogRating = false;
      this.readData();
    },
    cancel() {
    //   this.resetForm();
    this.url_foto = "";
      this.readData();
      this.dialog = false;
      this.dialogRecipient = false;
      this.dialogConfirm = false;
      this.dialogRating = false;
      this.inputType = "Pembayaran";
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

    createImage(file) {
      const reader = new FileReader();

      reader.onloadend = (e) => {
        this.b64_foto = e.target.result;
        this.getImageStorageURL(this.b64_foto);
      };

      reader.readAsDataURL(file);
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
    getImageStorageURL(img_url) {
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
          this.imageStoreURL = response.data.data;
          this.url_foto = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
  },
};
</script>