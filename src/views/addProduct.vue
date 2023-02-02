<template>
    <nav-header-vue/>
    <div class="container mt-4">

        <div class="row">
            <div class="col-lg-6">
              <h2 id="nav-breadcrumbs">daftar produk</h2>
              <div class="bs-component">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><router-link to="/" href="#">Home</router-link></li>
                  <li class="breadcrumb-item"><router-link to="/product" href="#">Kosmetik</router-link></li>
                  <li class="breadcrumb-item active">daftar produk</li>
                </ol>
              </div>
            </div>
        </div>
        <form @submit.prevent="addProduct">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="mb-2 mt-2">nama produk</label>
                        <input type="file" class="form-control mb-2" @change="imgUpload" >
                    </div>
                    <!--<img :src="'../assets/cosmetik/'+product.gambar" class="img-fluid shadow"/>-->
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="mb-2 mt-2">nama produk</label>
                        <input type="number" class="form-control mb-2" v-model="product.name">
                    </div>
                    <div class="form-group">
                        <label class="mb-2 mt-2">harga produk</label>
                        <input type="number" class="form-control mb-2" v-model="product.harga">
                    </div>
                    <div class="form-group">
                        <label class="mb-2 mt-2">jumlah produk</label>
                        <input type="number" class="form-control mb-2" v-model="product.jumlah">
                    </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1" class="mb-2">Keterangan</label>
                            <textarea class="form-control mb-4" id="exampleFormControlTextarea1" placeholder="Keterangan" v-model="pesan.keterangan"></textarea>
                        </div>
                          
                        <button type="submit" class="btn btn-primary">Submit</button>
                    
                        <!--<div class="form-group">
                            <h4>{{product.nama}}</h4>
                            <hr>
                            <h4>Harga : Rp. {{product.harga}}</h4>
                            <label class="mb-2 mt-2">Jumlah Pemesanan</label>
                            <input type="number" class="form-control mb-2" placeholder="jumlah pembelian" v-model="pesan.jumlah">
                            
                        </div>-->
                    
                    </div>
            </div>
        </form>
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
        imgUpload(i){
            this.image = i.target.files[0];
            let fileReader = new FileReader();
            fileReader.readAsDataURL(this.image);
            fileReader.onload = (i) => {
                this.preview = i.target.result;
            }
        },
        async addProduct(){
            let formData = new FormData();
            formData.append('name',this.product.name);
            formData.append('harga',this.product.harga);
            formData.append('jumlah',this.product.jumlah);
            let url = 'http://127.0.0.1:8000/api/crud';
            await axios.post(url, formData)
            .then((response)=>{
                if (response.data.success == true){

                }
            }).catch((error)=>{

            });
        }
        /*pemesanan(){
            this.pesan.products=this.product;
            axios.post('http://localhost:3000/keranjangs',this.pesan)
            .then(()=>{
                alert("masuk keranjang");
                this.$router.push({path:"/keranjang"})
            }).catch((error)=>{
                console.log(error);
            })
        }*/
    },
    mounted(){
    axios
      .get("http://localhost:3000/products/"+this.$route.params.id)
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error));
    }
    
}
</script>