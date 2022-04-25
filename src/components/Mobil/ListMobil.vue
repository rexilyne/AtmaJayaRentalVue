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
            <v-data-table :headers="headers" :items="mobils" :search="search" :loading="load">
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
         <v-dialog v-model="dialog2" persistent max-width="600px">
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
               kontrakAkanHabis: false,
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
                       text: "ID Mobil",
                       align: "start",
                       sortable: true,
                       value: "id_mobil"
                   },
                   {
                       text: "Status Mobil",
                       value: "status_mobil"
                   },
                   { 
                       text: "ID Pemilik Mobil",
                       value: "id_pemilik_mobil"
                   },
                   {
                       text: "Nama Mobil",
                       value: "nama_mobil"
                   },
                   {
                       text: "Tipe Mobil",
                       value: "tipe_mobil"
                   },
                   {
                       text: "Jenis Transmisi",
                       value: "jenis_transmisi"
                   },
                   {
                       text: "Jenis Bahan Bakar",
                       value: 'jenis_bahan_bakar'
                   },
                   {
                       text: "Warna Mobil",
                       value: 'warna_mobil'
                   },
                   {
                       text: "Volume Bagasi",
                       value: 'volume_bagasi'
                   },
                   {
                       text: "Fasilitas",
                       value: 'fasilitas'
                   },
                   {
                       text: "Kapasitas Penumpang",
                       value: 'kapasitas_penumpang'
                   },
                   {
                       text: "Plat Nomor",
                       value: 'plat_nomor'
                   },
                   {
                       text: "Nomor STNK",
                       value: 'nomor_stnk'
                   },
                   {
                       text: "Kategori Aset",
                       value: 'kategori_aset'
                   },
                   {
                       text: "Harga Sewa",
                       value: 'harga_sewa'
                   },
                   {
                       text: "Status Sewa",
                       value: 'status_sewa'
                   },
                   {
                       text: "Tanggal Terakhir Kali Servis",
                       value: 'tanggal_terakhir_kali_servis'
                   },
                   {
                       text: "Periode Kontrak Mulai",
                       value: 'periode_kontrak_mulai'
                   },
                   {
                       text: "Periode Kontrak Akhir",
                       value: 'periode_kontrak_akhir'
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
               course: new FormData,
               mobils: [],
               form: {
                   nama_kelas: null,
                   kode: null,
                   biaya_pendaftaran: null,
                   kapasitas: null
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
               var url = this.$api + '/keloladata/mobil';
               this.$http.get(url, {
                   headers: {
                       'Authorization' : 'Bearer ' + localStorage.getItem('token')
                   }
               }).then(response => {
                   this.mobils = response.data.data;
                   this.overlay = false;
               }).catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.overlay = false;
        });
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
               var url = this.$api + '/keloladata/mobil/delete/' + this.deleteId;
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
               if(!this.kontrakAkanHabis) { //nampilin dialog update mobil biasa
                   this.inputType = 'Ubah';
                    this.editId = item.id;
                    this.form.nama_kelas = item.nama_kelas;
                    this.form.kode = item.kode;
                    this.form.biaya_pendaftaran = item.biaya_pendaftaran;
                    this.form.kapasitas = item.kapasitas;
                    this.dialog = true;
               } else { // nampilin dialog update mobil kontrak akan habis
                   this.inputType = 'Ubah';
                    this.editId = item.id;
                    this.form.nama_kelas = item.nama_kelas;
                    this.form.kode = item.kode;
                    this.form.biaya_pendaftaran = item.biaya_pendaftaran;
                    this.form.kapasitas = item.kapasitas;
                    this.dialog2 = true;
               }
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
                   nama_kelas: null,
                   kode: null,
                   biaya_pendaftaran: null,
                   kapasitas: null
               };
           },
           change() {
               if(this.kontrakAkanHabis == true) {
                   var url_1 = this.$api + '/keloladata/mobil/showkontrakakanhabis';
                this.$http.get(url_1, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.mobils = response.data.data;
                })
               } else {
                   var url_2 = this.$api + '/keloladata/mobil';
               this.$http.get(url_2, {
                   headers: {
                       'Authorization' : 'Bearer ' + localStorage.getItem('token')
                   }
               }).then(response => {
                   this.mobils = response.data.data;
               })
               }
           }
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