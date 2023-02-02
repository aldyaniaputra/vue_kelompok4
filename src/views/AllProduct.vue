<template>
  <nav-header-vue />

  <div class="container">
    <div class="mt-4">
      <h2>Daftar Product</h2>

      <div class="input-group">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Pencarian Kosmetik"
          aria-label="Username"
          aria-describedby="basic-addon1"
          @keyup="searchkosmetik"
        />
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"
            ><i class="bi bi-search"></i
          ></span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <router-link to="/addProduct" class="btn btn-primary" style="float: right">Tambah Product
          </router-link>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-4" v-for="product in products" :key="product.id">
        <card-product :product="product"/>
      </div>
    </div>
  </div>
  
</template>

<script>
import NavHeaderVue from "@/components/NavHeader.vue";
import HeroPageVue from "@/components/HeroPage.vue";
import CardProduct from "@/components/CardProduct.vue";

import axios from "axios";

export default {
  components: {
    NavHeaderVue,
    HeroPageVue,
    CardProduct,
   
  },
  data() {
    return {
      products: [],
      search:''
    };
  },
  created(){
    this.getProducts();
  },
  methods: {
    async getProducts(){
      let url = "http://127.0.0.1:8000/api/crud";
      await axios.get(url).then((response)=>{
        this.products = response.data.data;
      }).catch((error) => {
        console.log(error);
      })
    }
    /* setProducts(data) {
      this.products = data;
    },
    searchkosmetik(){
      axios
      .get("http://localhost:3000/products?q="+this.search)
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error));
    } */
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error));
  },
};
</script>
