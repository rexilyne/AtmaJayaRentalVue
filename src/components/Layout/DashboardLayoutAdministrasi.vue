<template>
  <div>
    <v-app-bar
      app
      fixed
      clipped-left
      height="90"
      color="blue darken-4"
      elevation="4"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="yellow"
      ></v-app-bar-nav-icon>
      <div class="text-h6 font-weight-bold yellow--text mx-2">
        Atma Jogja Rental
      </div>
      <v-spacer></v-spacer>
      <v-icon role="button" color="white" @click="logout">mdi-logout</v-icon>

      <!-- <v-btn class="mr-3" outlined color="white" @click="register">Register</v-btn> -->
      <!-- <v-btn class="" outlined color="white" @click="login">Login</v-btn> -->

      <!-- <v-app-bar-title>TokoLaku.id</v-app-bar-title> -->
      <!-- <v-spacer> -->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" medium></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: "mdi-account-circle",
          title: "Profile",
          to: "/administrasi/profile",
        },
        {
          icon: "mdi-card-account-details",
          title: "List Driver",
          to: "/administrasi/data/driver",
        },
        { icon: "mdi-car", title: "List Mobil", to: "/administrasi/data/mobil" },
        { icon: "mdi-handshake", title: "List Pemilik Mobil", to: "/administrasi/data/pemilikmobil" },
        { icon: "mdi-office-building", title: "List Pegawai", to: "/administrasi/data/pegawai" },
      ],
    };
  },
  methods: {
    home() {
      this.$router.push({
        name: "Welcome",
      });
    },

    logout() {
      localStorage.removeItem("token");
      this.$http.post(this.$api + "/logout/pegawai");
      this.$router.push({
        name: "Welcome",
      });
    },
  },
};
</script>
