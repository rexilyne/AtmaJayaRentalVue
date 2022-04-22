<template>
<v-main>
<div class="text-h2 mt-16 text-center font-weight-thin white--text">Pinjam Mobil Mudah</div>
 <v-layout column align-center>
               <v-flex class="mt-12"> 
                   <v-img 
                        :src="images.logo" 
                        max-height="400"
                        max-width="400"
                        contain
                    >
                    </v-img>
               </v-flex>
          </v-layout>
<div class="text-h2 mt-16 text-center font-weight-bold font-italic yellow--text">Atma Jogja Rental</div>
<div class="text-h2 mt-16 text-center font-weight-thin white--text">Rental Services</div>
</v-main>
</template>

<script>
    export default {
        data() {
            return {
                images: {
                    logo: require('@/assets/logo_ajr_trans.png')
                }
            };
        },
    }
</script>