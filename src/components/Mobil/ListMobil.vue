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

        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="mobils"
        :search="search"
        :loading="load"
      >
        <template v-slot:top>
          <v-switch
            v-model="kontrakAkanHabis"
            label="Kontrak Akan Habis"
            class="pa-3"
            @change="change"
          ></v-switch>
        </template>
        <template v-slot:[`item.url_foto`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_foto"
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
            color="red"
            small
            @click="deleteHandler(item.id_mobil)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete label="Nama Pemilik Mobil" v-model="form.id_pemilik_mobil"/>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field label="Nama Mobil" v-model="form.nama_mobil"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Tipe Mobil" v-model="form.tipe_mobil"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field label="Jenis Transmisi" v-model="form.jenis_transmisi"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Jenis Bahan Bakar" v-model="form.jenis_bahan_bakar"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field label="Warna Mobil" v-model="form.warna_mobil"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Volume Bagasi" v-model="form.volume_bagasi"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-textarea label="Fasilitas" v-model="form.fasilitas"></v-textarea>
              </v-col>
              <v-col>
                <v-text-field label="Kapasitas Penumpang" v-model="form.kapasitas_penumpang"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field label="Plat Nomor" v-model="form.plat_nomor"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Nomor STNK" v-model="form.nomor_stnk"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select label="Kategori Aset" v-model="form.kategori_aset" />
              </v-col>
              <v-col>
                <v-text-field label="Harga Sewa" v-model="form.harga_sewa"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select label="Status Sewa" v-model="form.status_sewa" />
              </v-col>
              <v-col>
                <v-menu
                  v-model="menuTanggalTerakhirKaliServis"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.tanggal_terakhir_kali_servis"
                      label="Tanggal Terakhir Kali Servis"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.tanggal_terakhir_kali_servis"
                    @input="menuTanggalTerakhirKaliServis = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-menu
                  v-model="menuPeriodeKontrakMulai"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.periode_kontrak_mulai"
                      label="Periode Kontrak Mulai"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.periode_kontrak_mulai"
                    @input="menuPeriodeKontrakMulai = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="menuPeriodeKontrakAkhir"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.periode_kontrak_akhir"
                      label="Periode Kontrak Akhir"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.periode_kontrak_akhir"
                    @input="menuPeriodeKontrakAkhir = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card>
                  <v-img :src="form.url_foto" class="grey darken-4"></v-img>
                  <v-card-title class="text-h6"> Foto Mobil </v-card-title>
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

    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-menu
                  v-model="menuPeriodeKontrakMulai"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.periode_kontrak_mulai"
                      label="Periode Kontrak Mulai"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.periode_kontrak_mulai"
                    @input="menuPeriodeKontrakMulai = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="menuPeriodeKontrakAkhir"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.periode_kontrak_akhir"
                      label="Periode Kontrak Akhir"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.periode_kontrak_akhir"
                    @input="menuPeriodeKontrakAkhir = false"
                  ></v-date-picker>
                </v-menu>
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
        <v-card-text> Anda yakin ingin menghapus kelas ini? </v-card-text>
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
      menuTanggalTerakhirKaliServis: false,
      menuPeriodeKontrakMulai: false,
      menuPeriodeKontrakAkhir: false,
      overlayDialogTambahEdit: false,
      overlayDialogDelete: false,
      overlay: false,
      kontrakAkanHabis: false,
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialog2: false,
      dialogConfirm: false,
      headers: [
        {
          text: "ID Mobil",
          align: "start",
          sortable: true,
          value: "id_mobil",
        },
        {
          text: "Status Mobil",
          value: "status_mobil",
        },
        {
          text: "ID Pemilik Mobil",
          value: "id_pemilik_mobil",
        },
        {
          text: "Nama Mobil",
          value: "nama_mobil",
        },
        {
          text: "Tipe Mobil",
          value: "tipe_mobil",
        },
        {
          text: "Jenis Transmisi",
          value: "jenis_transmisi",
        },
        {
          text: "Jenis Bahan Bakar",
          value: "jenis_bahan_bakar",
        },
        {
          text: "Warna Mobil",
          value: "warna_mobil",
        },
        {
          text: "Volume Bagasi",
          value: "volume_bagasi",
        },
        {
          text: "Fasilitas",
          value: "fasilitas",
        },
        {
          text: "Kapasitas Penumpang",
          value: "kapasitas_penumpang",
        },
        {
          text: "Plat Nomor",
          value: "plat_nomor",
        },
        {
          text: "Nomor STNK",
          value: "nomor_stnk",
        },
        {
          text: "Kategori Aset",
          value: "kategori_aset",
        },
        {
          text: "Harga Sewa",
          value: "harga_sewa",
        },
        {
          text: "Status Sewa",
          value: "status_sewa",
        },
        {
          text: "Tanggal Terakhir Kali Servis",
          value: "tanggal_terakhir_kali_servis",
        },
        {
          text: "Periode Kontrak Mulai",
          value: "periode_kontrak_mulai",
        },
        {
          text: "Periode Kontrak Akhir",
          value: "periode_kontrak_akhir",
        },
        {
          text: "Image",
          value: "url_foto",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      mobil: new FormData(),
      mobils: [],
      form: {
        id_pemilik_mobil: null,
        nama_mobil: null,
        tipe_mobil: null,
        jenis_transmisi: null,
        jenis_bahan_bakar: null,
        warna_mobil: null,
        volume_bagasi: null,
        fasilitas: null,
        kapasitas_penumpang: null,
        plat_nomor: null,
        nomor_stnk: null,
        kategori_aset: null,
        harga_sewa: null,
        status_sewa: null,
        tanggal_terakhir_kali_servis: null,
        periode_kontrak_mulai: null,
        periode_kontrak_akhir: null,
        url_foto: null,
      },
      deleteId: "",
      editId: "",
      image: undefined,
      imageStoreURL: "",
      b64_foto: "",
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
      var url = this.$api + "/keloladata/mobil";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.mobils = response.data.data;
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
      this.mobil.append("nama_kelas", this.form.nama_kelas);
      this.mobil.append("kode", this.form.kode);
      this.mobil.append("biaya_pendaftaran", this.form.biaya_pendaftaran);
      this.mobil.append("kapasitas", this.form.kapasitas);

      var url = this.$api + "/keloladata/mobil/store";
      this.load = true;
      this.overlayDialogTambahEdit = true;
      this.$http
        .post(url, this.mobil, {
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
    // Ubah data Course
    update() {
      let newData = {
        id_pemilik_mobil: this.form.id_pemilik_mobil,
        nama_mobil: this.form.nama_mobil,
        tipe_mobil: this.form.tipe_mobil,
        jenis_transmisi: this.form.jenis_transmisi,
        jenis_bahan_bakar: this.form.jenis_bahan_bakar,
        warna_mobil: this.form.warna_mobil,
        volume_bagasi: this.form.volume_bagasi,
        fasilitas: this.form.fasilitas,
        kapasitas_penumpang: this.form.kapasitas_penumpang,
        plat_nomor: this.form.plat_nomor,
        nomor_stnk: this.form.nomor_stnk,
        kategori_aset: this.form.kategori_aset,
        harga_sewa: this.form.harga_sewa,
        status_sewa: this.form.status_sewa,
        tanggal_terakhir_kali_servis: this.form.tanggal_terakhir_kali_servis,
        periode_kontrak_mulai: this.form.periode_kontrak_mulai,
        periode_kontrak_akhir: this.form.periode_kontrak_akhir,
        url_foto: this.form.url_foto,
      };
      var url = this.$api + "/keloladata/mobil/update" + this.editId;
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
      var url = this.$api + "/keloladata/mobil/delete/" + this.deleteId;
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
      this.inputType = "Ubah";
      this.editId = item.id_mobil;
      this.form.id_pemilik_mobil = item.id_pemilik_mobil;
      this.form.nama_mobil = item.nama_mobil;
      this.form.tipe_mobil = item.tipe_mobil;
      this.form.jenis_transmisi = item.jenis_transmisi;
      this.form.jenis_bahan_bakar = item.jenis_bahan_bakar;
      this.form.warna_mobil = item.warna_mobil;
      this.form.volume_bagasi = item.volume_bagasi;
      this.form.fasilitas = item.fasilitas;
      this.form.kapasitas_penumpang = item.kapasitas_penumpang;
      this.form.plat_nomor = item.plat_nomor;
      this.form.nomor_stnk = item.nomor_stnk;
      this.form.kategori_aset = item.kategori_aset;
      this.form.harga_sewa = item.harga_sewa;
      this.form.status_sewa = item.status_sewa;
      this.form.tanggal_terakhir_kali_servis =
        item.tanggal_terakhir_kali_servis;
      this.form.periode_kontrak_mulai = item.periode_kontrak_mulai;
      this.form.periode_kontrak_akhir = item.periode_kontrak_akhir;
      this.form.url_foto = item.url_foto;
      if (!this.kontrakAkanHabis) {
        //nampilin dialog update mobil biasa
        this.dialog = true;
      } else {
        // nampilin dialog update mobil kontrak akan habis
        this.dialog2 = true;
      }
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialog2 = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        id_pemilik_mobil: null,
        nama_mobil: null,
        tipe_mobil: null,
        jenis_transmisi: null,
        jenis_bahan_bakar: null,
        warna_mobil: null,
        volume_bagasi: null,
        fasilitas: null,
        kapasitas_penumpang: null,
        plat_nomor: null,
        nomor_stnk: null,
        kategori_aset: null,
        harga_sewa: null,
        status_sewa: null,
        tanggal_terakhir_kali_servis: null,
        periode_kontrak_mulai: null,
        periode_kontrak_akhir: null,
        url_foto: null,
      };
    },
    change() {
      if (this.kontrakAkanHabis == true) {
        var url_1 = this.$api + "/keloladata/mobil/showkontrakakanhabis";
        this.$http
          .get(url_1, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.mobils = response.data.data;
          });
      } else {
        var url_2 = this.$api + "/keloladata/mobil";
        this.$http
          .get(url_2, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.mobils = response.data.data;
          });
      }
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
          this.form.url_foto = response.data.data;
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
