import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/landing',
            component: importComponent('Layout/NavbarLayout'),
            children: [
                {
                    path: '/landing/welcome',
                    name: 'Welcome',
                    meta: { title: 'Welcome' },
                    component: importComponent('Welcome')
                }
            ]
        },

        {
            path: '/authentication',
            // redirect: '/authentication/login',
            component: importComponent('Layout/AuthenticationLayout'),
            children: [
                // Choose Login
                {
                    path: '/authentication/chooselogin',
                    name: 'Choose Login',
                    meta: { title: 'Choose Login' },
                    component: importComponent('Authentication/ChooseLogin')
                },

                // Login Customer
                {
                    path: '/authentication/customer/login',
                    name: 'Login Customer',
                    meta: { title: 'Login Customer' },
                    component: importComponent('Authentication/LoginCustomer')
                },

                // Login Pegawai
                {
                    path: '/authentication/pegawai/login',
                    name: 'Login Pegawai',
                    meta: { title: 'Login Pegawai' },
                    component: importComponent('Authentication/LoginPegawai')
                },

                // Register Customer
                {
                    path: '/authentication/customer/register',
                    name: 'Register Customer',
                    meta: { title: 'Register Customer' },
                    component: importComponent('Authentication/RegisterCustomer')
                }
            ]
        },

        {
            path: '/customer',
            component: importComponent('Layout/DashboardLayoutCustomer'),
            children: [
                // Profile
                {
                    path: '/customer/profile',
                    name: 'Customer Profile',
                    meta: { title: 'Customer Profile' },
                    component: importComponent('Customer/CustomerProfile')
                },

                // Make Penyewaan
                {
                    path: '/customer/makepenyewaan',
                    name: 'Make Penyewaan',
                    meta: { title: 'Make Penyewaan' },
                    component: importComponent('Penyewaan/MakePenyewaan')
                },

                // Nota Penyewaan
                {
                    path: '/customer/notapenyewaan',
                    name: 'Nota Penyewaan',
                    meta: { title: 'Nota Penyewaan' },
                    component: importComponent('Penyewaan/NotaPenyewaan')
                }
            ]
        },

        {
            path: '/administrasi',
            component: importComponent('Layout/DashboardLayoutAdministrasi'),
            children: [
                // Kelola Data Driver
                {
                    path: '/administrasi/data/driver',
                    name: 'List Driver',
                    meta: { title: 'List Driver' },
                    component: importComponent('Driver/ListDriver')
                },

                //Kelola Data Mobil
                {
                    path: '/administrasi/data/mobil',
                    name: 'List Mobil',
                    meta: { title: 'List Mobil' },
                    component: importComponent('Mobil/ListMobil')
                },

                //Kelola Data Pemilik Mobil
                {
                    path: '/administrasi/data/pemilikmobil',
                    name: 'List Pemilik Mobil',
                    meta: { title: 'List Pemilik Mobil' },
                    component: importComponent('PemilikMobil/ListPemilikMobil')
                },

                //Kelola Data Pegawai
                {
                    path: '/administrasi/data/pegawai',
                    name: 'List Pegawai',
                    meta: { title: 'List Pegawai' },
                    component: importComponent('Pegawai/ListPegawai')
                },

                // Profile
                {
                    path: '/administrasi/profile',
                    name: 'Administrasi Profile',
                    meta: { title: 'Administrasi Profile' },
                    component: importComponent('Pegawai/PegawaiProfile')
                },

                // Jadwal Kerja
                {
                    path: '/administrasi/jadwal',
                    name: 'Jadwal Administrasi',
                    meta: { title: 'Jadwal Administrasi'},
                    component: importComponent('Jadwal/ListShiftPegawai')
                }
            ]
        },

        {
            path: '/manager',
            component: importComponent('Layout/DashboardLayoutManager'),
            children: [
                // Kelola Data Promo
                {
                    path: '/manager/data/promo',
                    name: 'List Promo',
                    meta: { title: 'List Promo' },
                    component: importComponent('Promo/ListPromo')
                },

                // Kelola Penjadwalan
                {
                    path: '/manager/data/penjadwalan',
                    name: 'Penjadwalan Pegawai',
                    meta: { title: 'Penjadwalan Pegawai' },
                    component: importComponent('Jadwal/PenjadwalanPegawai')
                },

                // Profile
                {
                    path: '/manager/profile',
                    name: 'Manager Profile',
                    meta: { title: 'Manager Profile' },
                    component: importComponent('Pegawai/PegawaiProfile')
                },

                // Jadwal Kerja
                // {
                //     path: '/manager/jadwal',
                //     name: 'Jadwal Manager',
                //     meta: { title: 'Jadwal Manager'},
                //     component: importComponent('Jadwal/ListShiftPegawai')
                // }
            ]
        },

        {
            path: '/customerservice',
            component: importComponent('Layout/DashboardLayoutCustomerService'),
            children: [
                // Kelola Data Customer
                {
                    path: '/customerservice/data/customer',
                    name: 'List Customer',
                    meta: { title: 'List Customer' },
                    component: importComponent('Customer/ListCustomer')
                },

                // Profile
                {
                    path: '/customerservice/profile',
                    name: 'Customer Service Profile',
                    meta: { title: 'Customer Service Profile' },
                    component: importComponent('Pegawai/PegawaiProfile')
                },

                // Jadwal Kerja
                {
                    path: '/customerservice/jadwal',
                    name: 'Jadwal Customer Service',
                    meta: { title: 'Jadwal Customer Service' },
                    component: importComponent('Jadwal/ListShiftPegawai')
                },

                // Verifikasi Penyewaan
                {
                    path: '/customerservice/verifikasipenyewaan',
                    name: 'Verifikasi Penyewaan Customer Service',
                    meta: { title: 'Verifikasi Penyewaan Customer Service' },
                    component: importComponent('Penyewaan/VerifikasiPenyewaan')
                }
            ]
        },

        {
            path: '/print',
            component: importComponent('Layout/PrintLayout'),
            children: [
                // Print Nota Penyewaan
                {
                    path: '/print/notapenyewaan',
                    name: 'Print Nota Penyewaan',
                    meta: { title: 'Print Nota Penyewaan' },
                    component: importComponent('Penyewaan/CetakNotaPenyewaan')
                }
            ]
        },

 
        {
            path: '*',
            redirect: '/landing/welcome'
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;