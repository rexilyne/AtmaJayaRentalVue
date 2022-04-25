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
        :items="drivers"
        :search="search"
        :loading="load"
      >
        <template v-slot:[`item.url_sim`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_sim"
              alt="-"
              height="100px"
              width="100px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.url_surat_bebas_napza`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_surat_bebas_napza"
              alt="-"
              height="100px"
              width="100px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.url_surat_kesehatan_jiwa`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_surat_kesehatan_jiwa"
              alt="-"
              height="100px"
              width="100px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.url_skck`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.url_skck"
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
            @click="deleteHandler(item.id_driver)"
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
                <v-select label="Bahasa" />
              </v-col>
              <v-col>
                <v-text-field label="Tarif Driver"></v-text-field>
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
        <v-card-text> Anda yakin ingin menghapus driver ini? </v-card-text>
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
          text: "ID Driver",
          align: "start",
          sortable: true,
          value: "id_driver",
        },
        {
          text: "Status Akun",
          value: "status_akun",
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
          text: "Bahasa",
          value: "bahasa",
        },
        {
          text: "Status Driver",
          value: "status_driver",
        },
        {
          text: "Rerata Rating",
          value: "rerata_rating",
        },
        {
          text: "SIM",
          value: "url_sim",
        },
        {
          text: "Surat Bebas Napza",
          value: "url_surat_bebas_napza",
        },
        {
          text: "Surat Kesehatan Jiwa",
          value: "url_surat_kesehatan_jiwa",
        },
        {
          text: "SKCK",
          value: "url_skck",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      driver: new FormData(),
      drivers: [],
      form: {
        status_akun: null,
        nama: null,
        alamat: null,
        tanggal_lahir: null,
        jenis_kelamin: null,
        email: null,
        no_telp: null,
        bahasa: null,
        status_driver: null,
        password: null,
        tarif_driver: null,
        url_sim: null,
        url_surat_bebas_napza: null,
        url_surat_kesehatan_jiwa: null,
        url_skck: null,
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
      var url = this.$api + "/keloladata/driver";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.drivers = response.data.data;
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
      this.driver.append("nama", this.form.nama);
      this.driver.append("alamat", this.form.alamat);
      this.driver.append("tanggal_lahir", this.form.tanggal_lahir);
      this.driver.append("jenis_kelamin", this.form.jenis_kelamin);
      this.driver.append("email", this.form.email);
      this.driver.append("no_telp", this.form.no_telp);
      this.driver.append("bahasa", this.form.bahasa);
      this.driver.append("password", this.form.password);
      this.driver.append("tarif_driver", this.form.tarif_driver);
      this.driver.append("url_sim", this.form.url_sim);
      this.driver.append(
        "url_surat_bebas_napza",
        this.form.url_surat_bebas_napza
      );
      this.driver.append(
        "url_surat_kesehatan_jiwa",
        this.form.url_surat_kesehatan_jiwa
      );
      this.driver.append("url_skck", this.form.url_skck);

      var url = this.$api + "/keloladata/driver/store";
      this.load = true;
      this.overlayDialogTambahEdit = true;
      this.$http
        .post(url, this.course, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
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
        nama: this.form.nama,
        alamat: this.form.alamat,
        tanggal_lahir: this.form.tanggal_lahir,
        jenis_kelamin: this.form.jenis_kelamin,
        email: this.form.email,
        no_telp: this.form.no_telp,
        bahasa: this.form.bahasa,
        status_driver: this.form.status_driver,
        password: this.form.password,
        tarif_driver: this.form.tarif_driver,
        url_sim: this.form.url_sim,
        url_surat_bebas_napza: this.form.url_surat_bebas_napza,
        url_surat_kesehatan_jiwa: this.form.url_surat_kesehatan_jiwa,
        url_skck: this.form.url_skck,
      };
      var url = this.$api + "/keloladata/driver/update/" + this.editId;
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
      var url = this.$api + "/keloladata/driver/delete/" + this.deleteId;
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
      this.editId = item.id_driver;
      this.form.status_akun = item.status_akun;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.form.jenis_kelamin = item.jenis_kelamin;
      this.form.email = item.email;
      this.form.no_telp = item.no_telp;
      this.form.bahasa = item.bahasa;
      this.form.status_driver = item.status_driver;
      this.form.tarif_driver = item.driver;
      this.form.url_sim = item.url_sim;
      this.form.url_surat_bebas_napza = item.url_surat_bebas_napza;
      this.form.url_surat_kesehatan_jiwa = item.url_surat_kesehatan_jiwa;
      this.form.url_skck = item.url_skck;
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
        status_akun: null,
        nama: null,
        alamat: null,
        tanggal_lahir: null,
        jenis_kelamin: null,
        email: null,
        no_telp: null,
        bahasa: null,
        status_driver: null,
        password: null,
        tarif_driver: null,
        url_sim: null,
        url_surat_bebas_napza: null,
        url_surat_kesehatan_jiwa: null,
        url_skck: null,
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
