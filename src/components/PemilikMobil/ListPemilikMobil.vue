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
        :items="pemilik_mobils"
        :search="search"
        :loading="load"
      >
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
            @click="deleteHandler(item.id_pemilik_mobil)"
          >
            mdi-delete
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
              v-model="form.nama"
              label="Nama"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.no_ktp"
              label="Nomor KTP"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.alamat"
              label="Alamat"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.no_telp"
              label="Nomor Telepon"
              required
            ></v-text-field>
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
        <v-card-text>
          Anda yakin ingin menghapus pemilik mobil ini?
        </v-card-text>
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
      headers: [
        {
          text: "ID Pemilik Mobil",
          align: "start",
          sortable: true,
          value: "id_pemilik_mobil",
        },
        {
          text: "Status Pemilik",
          value: "status_pemilik",
        },
        {
          text: "Nama",
          value: "nama",
        },
        {
          text: "Nomor KTP",
          value: "no_ktp",
        },
        {
          text: "Alamat",
          value: "alamat",
        },
        {
          text: "Nomor Telepon",
          value: "no_telp",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      pemilik_mobil: new FormData(),
      pemilik_mobils: [],
      form: {
        nama: null,
        no_ktp: null,
        alamat: null,
        no_telp: null,
      },
      deleteId: "",
      editId: "",
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
      var url = this.$api + "/keloladata/pemilikmobil";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.pemilik_mobils = response.data.data;
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
      this.pemilik_mobil.append("nama", this.form.nama);
      this.pemilik_mobil.append("no_ktp", this.form.no_ktp);
      this.pemilik_mobil.append("alamat", this.form.alamat);
      this.pemilik_mobil.append("no_telp", this.form.no_telp);

      var url = this.$api + "/keloladata/pemilikmobil/store";
      this.load = true;
      this.overlayDialogTambahEdit = true;
      this.$http
        .post(url, this.pemilik_mobil, {
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
        nama: this.form.nama,
        no_ktp: this.form.no_ktp,
        alamat: this.form.alamat,
        no_telp: this.form.no_telp,
      };
      var url = this.$api + "/keloladata/pemilikmobil/update/" + this.editId;
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

    deleteData() {
      var url = this.$api + "/keloladata/pemilikmobil/delete/" + this.deleteId;
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
      this.editId = item.id_pemilik_mobil;
      this.form.nama = item.nama;
      this.form.no_ktp = item.no_ktp;
      this.form.alamat = item.alamat;
      this.form.no_telp = item.no_telp;
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
        nama: null,
        no_ktp: null,
        alamat: null,
        no_telp: null,
      };
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
