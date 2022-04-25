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
        :items="promos"
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
            @click="deleteHandler(item.id_promo)"
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
              v-model="form.kode_promo"
              label="Kode Promo"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.jenis_promo"
              label="Jenis Promo"
              required
            ></v-text-field>
            <v-textarea
              v-model="form.keterangan"
              label="Keterangan"
              required
            ></v-textarea>
            <v-text-field
              type="number"
              v-model="form.diskon_promo"
              label="Diskon Promo"
              required
            ></v-text-field>
            <v-select
              v-model="form.status_promo"
              :items="status_promos"
              item-value="status"
              item-text="status"
              label="Status Promo"
            />
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
        <v-card-text> Anda yakin ingin menghapus promo ini? </v-card-text>
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
          text: "ID Promo",
          align: "start",
          sortable: true,
          value: "id_promo",
        },
        {
          text: "Kode Promo",
          value: "kode_promo",
        },
        {
          text: "Jenis Promo",
          value: "jenis_promo",
        },
        {
          text: "Keterangan",
          value: "keterangan",
        },
        {
          text: "Diskon Promo",
          value: "diskon_promo",
        },
        {
          text: "Status Promo",
          value: "status_promo",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      promo: new FormData(),
      promos: [],
      form: {
        kode_promo: null,
        jenis_promo: null,
        keterangan: null,
        diskon_promo: null,
        status_promo: "Aktif",
      },
      deleteId: "",
      editId: "",
      status_promos: [
        {
          id: 1,
          status: "Aktif",
        },
        {
          id: 2,
          status: "Tidak Aktif",
        },
      ],
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
      var url = this.$api + "/keloladata/promo";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.promos = response.data.data;
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
      this.promo.append("kode_promo", this.form.kode_promo);
      this.promo.append("jenis_promo", this.form.jenis_promo);
      this.promo.append("keterangan", this.form.keterangan);
      this.promo.append("diskon_promo", this.form.diskon_promo);
      this.promo.append("status_promo", this.form.status_promo);

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
        kode_promo: this.form.kode_promo,
        jenis_promo: this.form.jenis_promo,
        keterangan: this.form.keterangan,
        diskon_promo: this.form.diskon_promo,
        status_promo: this.form.status_promo,
      };
      var url = this.$api + "/keloladata/promo/update/" + this.editId;
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
      this.inputType = "Ubah";
      this.editId = item.id_promo;
      this.form.kode_promo = item.kode_promo;
      this.form.jenis_promo = item.jenis_promo;
      this.form.keterangan = item.keterangan;
      this.form.diskon_promo = item.diskon_promo;
      this.form.status_promo = item.status_promo;
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
        kode_promo: null,
        jenis_promo: null,
        keterangan: null,
        diskon_promo: null,
        status_promo: "Aktif",
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
