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
        :items="pegawais"
        :search="search"
        :loading="load"
      >
        <template v-slot:[`item.id_role`]="{ item }">
          <div v-if="item.id_role === 1">Manager</div>
          <div v-if="item.id_role === 2">Administrasi</div>
          <div v-if="item.id_role === 3">Customer Service</div>
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
            @click="deleteHandler(item.id_pegawai)"
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
                <v-text-field
                  label="Nama"
                  v-model="form.nama"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Alamat"
                  v-model="form.alamat"
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
                      v-model="form.tanggal_lahir"
                      label="Tanggal Lahir"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @change="setPassword"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.tanggal_lahir"
                    @input="menu2 = false"
                    @change="setPassword"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-select
                  v-model="form.jenis_kelamin"
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
                  v-model="form.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Nomor Telepon"
                  v-model="form.no_telp"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="Password"
                  v-model="form.password"
                  type="password"
                  hint="Tanggal Lahir (YYYY-mm-dd)"
                  persistent-hint
                  readonly
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="form.id_role"
                  :items="roles"
                  item-value="id"
                  item-text="role"
                  label="Role"
                  :disabled="disableRole"
                />
              </v-col>
              <v-col cols="6">
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
        <v-card-text> Anda yakin ingin menghapus pegawai ini? </v-card-text>
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
      disableRole: false,
      overlayDialogTambahEdit: false,
      overlayDialogDelete: false,
      overlay: false,
      date: "",
      menu2: false,
      image: undefined,
      imageStoreURL: "",
      url_foto: "",
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
          text: "ID Pegawai",
          align: "start",
          sortable: true,
          value: "id_pegawai",
        },
        {
          text: "Status Akun",
          value: "status_akun",
        },
        {
          text: "Role",
          value: "id_role",
        },
        {
          text: "Nama",
          value: "nama",
        },
        {
          text: "Alamat",
          value: "alamat",
        },
        {
          text: "Tanggal Lahir",
          value: "tanggal_lahir",
        },
        {
          text: "Jenis Kelamin",
          value: "jenis_kelamin",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Nomor Telepon",
          value: "no_telp",
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
      pegawai: new FormData(),
      pegawais: [],
      form: {
        id_role: 1,
        nama: null,
        alamat: null,
        tanggal_lahir: null,
        jenis_kelamin: "Laki-laki",
        email: null,
        no_telp: null,
        password: null,
        url_foto: null,
        status_akun: null,
      },
      deleteId: "",
      editId: "",
      valid: false,
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
      roles: [
        {
          id: 1,
          role: "Manager",
        },
        {
          id: 2,
          role: "Administrasi",
        },
        {
          id: 3,
          role: "Customer Service",
        },
      ],
    };
  },
  methods: {
    setPassword() {
      this.form.password = this.form.tanggal_lahir;
    },
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },
    
    readData() {
      this.overlay = true;
      var url = this.$api + "/keloladata/pegawai";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
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
      this.pegawai.append("id_role", this.form.id_role);
      this.pegawai.append("nama", this.form.nama);
      this.pegawai.append("alamat", this.form.alamat);
      this.pegawai.append("tanggal_lahir", this.form.tanggal_lahir);
      this.pegawai.append("jenis_kelamin", this.form.jenis_kelamin);
      this.pegawai.append("email", this.form.email);
      this.pegawai.append("no_telp", this.form.no_telp);
      this.pegawai.append("password", this.form.password);
      this.pegawai.append("url_foto", this.form.url_foto);

      var url = this.$api + "/keloladata/pegawai/store";
      this.load = true;
      this.overlayDialogTambahEdit = true;
      this.$http
        .post(url, this.pegawai, {
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
        status_akun: this.form.status_akun,
        id_role: this.form.id_role,
        nama: this.form.nama,
        alamat: this.form.alamat,
        tanggal_lahir: this.form.tanggal_lahir,
        jenis_kelamin: this.form.jenis_kelamin,
        email: this.form.email,
        no_telp: this.form.no_telp,
        password: this.form.password,
        url_foto: this.form.url_foto,
      };
      var url = this.$api + "/keloladata/pegawai/update/" + this.editId;
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
      var url = this.$api + "/keloladata/pegawai/delete" + this.deleteId;
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
      this.form.id_role = item.id_role;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.form.email = item.email;
      this.form.url_foto = item.url_foto;
      this.form.status_akun = item.status_akun;
      this.dialog = true;
      this.disableRole = true;
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.disableRole = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.disableRole = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        id_role: null,
        nama: null,
        alamat: null,
        tanggal_lahir: null,
        jenis_kelamin: "Laki-laki",
        email: null,
        no_telp: null,
        password: null,
        url_foto: null,
        status_akun: null,
      };
      this.image = undefined;
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onloadend = (e) => {
        this.url_foto = e.target.result;
        this.getImageStorageURL(this.url_foto);
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
