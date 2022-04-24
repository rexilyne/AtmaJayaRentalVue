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
            <v-data-table :headers="headers" :items="pegawais" :search="search" :loading="load">
                <template v-slot:[`item.id_role`]="{ item }">
                  <div v-if="item.id_role === 1">Manager</div>
                  <div v-if="item.id_role === 2">Administrasi</div>
                  <div v-if="item.id_role === 3">Customer Service</div>
                </template>
                <template v-slot:[`item.url_foto`]="{ item }">
            <div class="p-2">
              <v-img :src="item.url_foto" alt="-" height="100px" width="100px"></v-img>
            </div>
          </template>
                <template v-slot:[`item.actions`]="{ item }">
                   <v-icon aria-label="update" role="button" aria-hidden="false" color="green" small class="mr-2" @click="editHandler(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon aria-label="delete" role="button" aria-hidden="false" color="red" small @click="deleteHandler(item.id)">
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
                        <v-text-field v-model="form.nama_kelas" label="Nama Kelas" required></v-text-field>
                        <v-text-field v-model="form.kode" label="Kode" required></v-text-field>
                        <v-text-field v-model="form.biaya_pendaftaran" label="Biaya Pendaftaran" required></v-text-field>
                        <v-text-field v-model="form.kapasitas" label="Kapasitas" required></v-text-field>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>
                    Anda yakin ingin menghapus kelas ini?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
        <v-overlay :value="overlay"><v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular></v-overlay>
    </v-main>
</template>

<script>
    export default {
       name: "List",
       data() {
           return {
               overlay: false,
               inputType: 'Tambah',
               load: false,
               snackbar: false,
               error_message: '',
               color: '',
               search: null,
               dialog: false,
               dialogConfirm: false,
               headers: [
                   { 
                       text: "ID Pegawai",
                       align: "start",
                       sortable: true,
                       value: "id_pegawai"
                   },
                   {
                       text: "Status Akun",
                       value: "status_akun"
                   },
                   {
                       text: "Role",
                       value: "id_role"
                   },
                   {
                       text: "Nama",
                       value: "nama"
                   },
                   {
                       text: "Alamat",
                       value: 'alamat'
                   },
                   {
                       text: "Tanggal Lahir",
                       value: 'tanggal_lahir'
                   },
                   {
                       text: "Jenis Kelamin",
                       value: 'jenis_kelamin'
                   },
                   {
                       text: "Email",
                       value: 'email'
                   },
                   {
                       text: "Nomor Telepon",
                       value: 'no_telp'
                   },
                   {
                       text: "Image",
                       value: 'url_foto'
                   },
                   {
                       text: "Actions",
                       value: 'actions'
                   }
               ],
               pegawai: new FormData,
               pegawais: [],
               form: {
                   id_role: null,
                   nama: null,
                   alamat: null,
                   tanggal_lahir: null,
                   jenis_kelamin: null,
                   email: null,
                   no_telp: null,
                   password: null,
                   url_foto: null,
                   url_foto_web: null
               },
               deleteId: '',
               editId: ''
           }
       },
       methods: {
           setForm() {
               if(this.inputType !== 'Tambah') {
                   this.update();
               } else {
                   this.save();
               }
           },
           // Read Data Courses
           readData() {
               this.overlay = true;
               var url = this.$api + '/keloladata/pegawai';
               this.$http.get(url, {
                   headers: {
                       'Authorization' : 'Bearer ' + localStorage.getItem('token')
                   }
               }).then(response => {
                   this.pegawais = response.data.data;
                   this.overlay = false;
               })
           },
           // Simpan data Course
           save() {
               this.course.append('nama_kelas', this.form.nama_kelas);
               this.course.append('kode', this.form.kode);
               this.course.append('biaya_pendaftaran', this.form.biaya_pendaftaran);
               this.course.append('kapasitas', this.form.kapasitas);

               var url = this.$api + '/course/'
               this.load = true;
               this.$http.post(url, this.course, {
                   headers: {
                       'Authorization' : 'Bearer ' + localStorage.getItem('token')
                   }
               }).then(response => {
                   this.error_message = response.data.message;
                   this.color = "green";
                   this.snackbar = true;
                   this.load = true;
                   this.close();
                   this.readData();
                   this.resetForm();
               }).catch(error => {
                   this.error_message = error.response.data.message;
                   this.color = "red";
                   this.snackbar = true;
                   this.load = false;
               })
           },
           // Ubah data Course
           update() {
               let newData = {
                   nama_kelas : this.form.nama_kelas,
                   kode : this.form.kode,
                   biaya_pendaftaran : this.form.biaya_pendaftaran,
                   kapasitas : this.form.kapasitas
               };
               var url = this.$api + '/course/' + this.editId;
               this.load = true;
               this.$http.put(url, newData, {
                   headers: {
                       'Authorization' : 'Bearer ' + localStorage.getItem('token')
                   }
               }).then(response => {
                   this.error_message = response.data.message;
                   this.color = "green";
                   this.snackbar = true;
                   this.load = false;
                   this.close();
                   this.readData();
                   this.resetForm();
                   this.inputType = 'Tambah';
               }).catch(error => {
                   this.error_message = error.response.data.message;
                   this.color = "red";
                   this.snackbar = true;
                   this.load = false;
               })
           },
           // Hapus data produk
           deleteData() {
               var url = this.$api + '/course/' + this.deleteId;
               this.load = true;
               this.$http.delete(url, {
                   headers: {
                       'Authorization' : 'Bearer ' + localStorage.getItem('token')
                   }
               }).then(response => {
                   this.error_message = response.data.message;
                   this.color = "green";
                   this.snackbar = true;
                   this.load = false;
                   this.close();
                   this.readData();
                   this.resetForm();
                   this.inputType = 'Tambah';
               }).catch(error => {
                   this.error_message = error.response.data.message;
                   this.color = "red";
                   this.snackbar = true;
                   this.load = false;
               })
           },
           editHandler(item) {
               this.inputType = 'Ubah';
               this.editId = item.id;
               this.form.nama_kelas = item.nama_kelas;
               this.form.kode = item.kode;
               this.form.biaya_pendaftaran = item.biaya_pendaftaran;
               this.form.kapasitas = item.kapasitas;
               this.dialog = true;
           },
           deleteHandler(id) {
               this.deleteId = id;
               this.dialogConfirm = true;
           },
           close() {
               this.dialog = false;
               this.inputType = 'Tambah';
               this.dialogConfirm = false;
               this.readData();
           },
           cancel() {
               this.resetForm();
               this.readData();
               this.dialog = false;
               this.dialogConfirm = false;
               this.inputType = 'Tambah';
           },
           resetForm() {
               this.form = {
                   id_role: null,
                   nama: null,
                   alamat: null,
                   tanggal_lahir: null,
                   jenis_kelamin: null,
                   email: null,
                   no_telp: null,
                   password: null,
                   url_foto: null,
                   url_foto_web: null
               };
           },
       },
       computed: {
           formTitle() {
               return this.inputType;
           },
       },
       mounted(){
           this.readData()
       }
    }
</script>