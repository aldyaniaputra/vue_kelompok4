<template>
    <nav-header-vue/>
    <div class="container mt-4">

        <div class="row">
            <div class="col-lg-6">
              <h2 id="nav-breadcrumbs">Detail Pesanan</h2>
              <div class="bs-component">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><router-link to="/" href="#">Home</router-link></li>
                  <li class="breadcrumb-item"><router-link to="/product" href="#">Kosmetik</router-link></li>
                  <li class="breadcrumb-item active">Detail Pesanan</li>
                </ol>
              </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <img :src="'../assets/cosmetik/'+product.gambar" class="img-fluid shadow"/>
            </div>
            <div class="col-md-6">
                <form v-on:submit.prevent class="">
                    <div class="form-group">
                        <h4>{{product.nama}}</h4>
                        <hr>
                        <h4>Harga : Rp. {{product.harga}}</h4>
                        <label class="mb-2 mt-2">Jumlah Pemesanan</label>
                        <input type="number" class="form-control mb-2" placeholder="jumlah pembelian" v-model="pesan.jumlah">
                        
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1" class="mb-2">Keterangan</label>
                        <textarea class="form-control mb-4" id="exampleFormControlTextarea1" placeholder="Keterangan" v-model="pesan.keterangan"></textarea>
                    </div>
                      
                    <button type="submit" class="btn btn-primary" @click="pemesanan">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import NavHeaderVue from '@/components/NavHeader.vue';
    import axios from 'axios';
export default {
    name:'pesanan',
    components:{
        NavHeaderVue
    },
    data(){
        return{
            product:{},
            pesan:{}
        }
    },
    methods:{
        setProducts(data){
            this.product=data;
        },
        pemesanan(){
            this.pesan.products=this.product;
            axios.post('http://localhost:3000/keranjangs',this.pesan)
            .then(()=>{
                alert("masuk keranjang");
                this.$router.push({path:"/keranjang"})
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    mounted(){
    axios
      .get("http://localhost:3000/products/"+this.$route.params.id)
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error));
    }
    
}
</script>