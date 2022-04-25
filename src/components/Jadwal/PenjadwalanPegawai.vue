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
        :items="detailjadwals"
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
            @click="deleteHandler(item)"
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
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="form.id_pegawai"
                  :items="pegawais"
                  item-value="id_pegawai"
                  item-text="nama"
                  label="Nama Pegawai"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="hari"
                  :items="haris"
                  item-value="hari"
                  item-text="hari"
                  label="Hari"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="shift"
                  :items="shifts"
                  item-value="shift"
                  item-text="shift"
                  label="Shift"
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
        <v-card-text> Anda yakin ingin menghapus detail jadwal ini? </v-card-text>
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
          text: "Nama Pegawai",
          align: "start",
          sortable: true,
          value: "nama",
        },
        {
          text: "Hari",
          value: "hari",
        },
        {
          text: "Shift",
          value: "shift",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      detailjadwal: new FormData(),
      detailjadwals: [],
      pegawais: [],
      haris: [
        {
          id: 1,
          hari: "Selasa",
        },
        {
          id: 2,
          hari: "Rabu",
        },
        {
          id: 3,
          hari: "Kamis",
        },
        {
          id: 4,
          hari: "Jumat",
        },
        {
          id: 5,
          hari: "Sabtu",
        },
        {
          id: 6,
          hari: "Minggu",
        },
      ],
      shifts: [
        {
          id: 1,
          shift: 1,
        },
        {
          id: 2,
          shift: 2,
        },
      ],
      hari: "Selasa",
      shift: 1,
      form: {
        id_pegawai: "",
        id_jadwal: "",
      },
      deleteId: "",
      deleteHari: "",
      deleteShift: "",
      idJadwalDelete: "",
      editId: "",
      editHari: "",
      editShift: "",
      idJadwalEdit: "",
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
      var url = this.$api + "/keloladata/detailjadwal";
      var urlPegawai = this.$api + "/pegawai";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.detailjadwals = response.data.data;
          return this.$http.get(urlPegawai, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        })
        .then((response) => {
          this.pegawais = response.data.data;
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
      this.detailjadwal.append("id_pegawai", this.form.id_pegawai);

      var url =
        this.$api + "/keloladata/jadwal/get/" + this.hari + "/" + this.shift;
      var urlSave = this.$api + "/keloladata/detailjadwal/store";
      this.load = true;
      this.overlayDialogTambahEdit = true;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.detailjadwal.append("id_jadwal", response.data.data.id_jadwal);
          return this.$http.post(urlSave, this.detailjadwal, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
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
      //   this.detailjadwal.append('id_pegawai', this.form.id_pegawai);

      let newData = {
        id_pegawai: this.form.id_pegawai,
        id_jadwal: null,
      };
      var url =
        this.$api + "/keloladata/jadwal/get/" + this.hari + "/" + this.shift;
      // var urlSave =
      //   this.$api + "/keloladata/detailjadwal/update/" + this.editId + "/" + ;
      this.load = true;
      this.overlayDialogTambahEdit = true;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        // .then((response) => {
        //   //   this.detailjadwal.append('id_jadwal', response.data.data.id_jadwal);
        //   newData.id_jadwal = response.data.data.id_jadwal;
        //   var urlEdit =
        //     this.$api +
        //     "/keloladata/jadwal/get/" +
        //     this.editHari +
        //     "/" +
        //     this.editShift;
        //   return this.$http.get(urlEdit, {
        //     headers: {
        //       Authorization: "Bearer " + localStorage.getItem("token"),
        //     },
        //   });
        // })
        .then((response) => {
          newData.id_jadwal = response.data.data.id_jadwal;
          var urlSave =
            this.$api +
            "/keloladata/detailjadwal/update/" +
            this.editId +
            "/" +
            this.idJadwalEdit;
          return this.$http.put(urlSave, newData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
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
      //
      //
      //
    },

    deleteData() {
      var url =
        this.$api +
        "/keloladata/detailjadwal/delete/" +
        this.deleteId +
        "/" +
        this.idJadwalDelete;

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
      this.editId = item.id_pegawai;
      this.editHari = item.hari;
      this.editShift = item.shift;
      this.idJadwalEdit = item.id_jadwal;
      this.form.id_pegawai = item.id_pegawai;
      this.hari = item.hari;
      this.shift = item.shift;
      this.dialog = true;
    },
    deleteHandler(item) {
      this.deleteId = item.id_pegawai;
      this.idJadwalDelete = item.id_jadwal;
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
        id_pegawai: "",
        id_jadwal: "",
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
