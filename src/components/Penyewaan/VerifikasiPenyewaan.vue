<template>
  <v-main class="list">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        >
        </v-text-field>

        <v-spacer></v-spacer>

        <!-- <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn> -->
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="penyewaans"
        :search="search"
        :loading="load"
      >
      <template v-slot:[`item.url_bukti_pembayaran`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_bukti_pembayaran"
              alt="-"
              height="100px"
              width="100px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            aria-label="update"
            role="button"
            aria-hidden="false"
            color="green"
            small
            class="mr-2"
            @click="editHandler(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            aria-label="delete"
            role="button"
            aria-hidden="false"
            color="orange"
            small
            @click="deleteHandler(item.id_promo)"
          >
            mdi-printer
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <v-text-field
              v-model="id_penyewaan"
              label="ID penyewaan"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_driver"
              label="ID Driver"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_customer"
              label="ID Customer"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_mobil"
              label="ID Mobil"
              outlined
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="id_pegawai"
              label="ID Pegawai"
              outlined
              required
              disabled
            ></v-text-field>
            <v-select
              v-model="status_penyewaan"
              :items="status_penyewaans"
              item-value="status"
              item-text="status"
              label="Status Penyewaan"
              outlined
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
      <v-overlay :value="overlayDialogTambahEdit"
        ><v-progress-circular indeterminate size="64"></v-progress-circular
      ></v-overlay>
    </v-dialog>
    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text> Anda yakin ingin menghapus penyewaan ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-actions>
      </v-card>
      <v-overlay :value="overlayDialogDelete"
        ><v-progress-circular indeterminate size="64"></v-progress-circular
      ></v-overlay>
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
  name: "List",
  data() {
    return {
      overlayDialogTambahEdit: false,
      overlayDialogDelete: false,
      overlay: false,
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      id_penyewaan: "",
      id_pegawai: "",
      id_customer: "",
      id_driver: "",
      id_mobil: "",
      image: undefined,
      imageStoreURL: "",
      b64_foto: "",
      url_foto: "",
      headers: [
        {
          text: "ID Penyewaan",
          align: "start",
          sortable: true,
          value: "id_penyewaan",
        },
        {
            text: "ID Pegawai",
            value: "id_pegawai"
        },
        {
            text: "ID Driver",
            value: "id_driver"
        },
        {
            text: "ID Customer",
            value: "id_customer"
        },
        {
            text: "ID Mobil",
            value: "id_mobil"
        },
        {
            text: "ID Promo",
            value: "id_promo"
        },
        {
            text: "Jenis Penyewaan",
            value: "jenis_penyewaan"
        },
        {
            text: "Tanggal Penyewaan",
            value: "tanggal_penyewaan"
        },
        {
            text: "Tanggal Mulai Sewa",
            value: "tanggal_mulai_sewa"
        },
        {
            text: "Tanggal Selesai",
            value: "tanggal_selesai"
        },
        {
            text: "Tanggal Pengembalian",
            value: "tanggal_pengembalian"
        },
        {
            text: "Total Harga Sewa",
            value: "total_harga_sewa"
        },
        {
            text: "Status Penyewaan",
            value: "status_penyewaan"
        },
        {
            text: "Tanggal Pembayaran",
            value: "tanggal_pembayaran"
        },
        {
            text: "Metode Pembayaran",
            value: "metode_pembayaran"
        },
        {
            text: "Total Diskon",
            value: "total_diskon"
        },
        {
            text: "Total Denda",
            value: "total_denda"
        },
        {
            text: "Total Harga Bayar",
            value: "total_harga_bayar"
        },
        {
            text: "Bukti Pembayaran",
            value: "url_bukti_pembayaran"
        },
        {
            text: "Rating Driver",
            value: "rating_driver"
        },
        {
            text: "Performa Driver",
            value: "performa_driver"
        },
        {
            text: "Rating Perusahaan",
            value: "rating_perusahaan"
        },
        {
            text: "Performa Perusahaan",
            value: "performa_perusahaan"
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      penyewaan: new FormData(),
      penyewaans: [],
      form: {
        kode_promo: "",
        jenis_promo: "",
        keterangan: "",
        diskon_promo: "",
        status_promo: "Aktif",
      },
      deleteId: "",
      editId: "",
      status_penyewaans: [
        { id: 1, status: "Belum Diverifikasi" },
        { id: 2, status: "Sedang Berjalan" },
        { id: 3, status: "Pembayaran Berhasil" },
        { id: 4, status: "Pembayaran Gagal" },
      ],
      status_penyewaan: ""
    };
  },
  methods: {
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },

    readData() {
      this.overlay = true;
      var url = this.$api + "/keloladata/penyewaan/show/nota";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.penyewaans = response.data.data;
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

      var url = this.$api + "/keloladata/promo/store";
      this.load = true;
      this.overlayDialogTambahEdit = true;
      this.$http
        .post(url, this.promo, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.overlayDialogTambahEdit = false;
          this.close();
          this.readData();
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.overlayDialogTambahEdit = false;
        });
    },

    update() {
       let newData = {
        id_penyewaan: this.id_penyewaan,
        id_customer: this.id_customer,
        id_driver: this.id_driver,
        id_pegawai: this.id_pegawai,
        id_mobil: this.id_mobil,
        id_promo: this.id_promo,
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
      var url = this.$api + "/keloladata/penyewaan/update/" + this.editId;
      this.load = true;
      this.overlayDialogTambahEdit = true;
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
          this.overlayDialogTambahEdit = false;
          this.close();
          this.readData();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.overlayDialogTambahEdit = false;
        });
    },
    // Hapus data produk
    deleteData() {
      var url = this.$api + "/keloladata/promo/delete/" + this.deleteId;
      this.load = true;
      this.overlayDialogDelete = true;
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
          this.overlayDialogDelete = false;
          this.close();
          this.readData();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.overlayDialogDelete = false;
        });
    },
    editHandler(item) {
       this.inputType = "Edit";
      this.editId = item.id_penyewaan;
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
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        kode_promo: "",
        jenis_promo: "",
        keterangan: "",
        diskon_promo: "",
        status_promo: "Aktif",
      };
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
      this.overlayDialogTambahEdit = true;
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
          this.overlayDialogTambahEdit = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.overlay = false;
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
