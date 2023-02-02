<template>
  <nav-header-vue/>
  <div class="container">
    <hero-page-vue/>
    <div class="row mt-4">
      <div class="col">
        <h3>Best<strong> Kosmetik</strong></h3>
      </div>
      <div class="col" >
        <router-link class="btn btn-primary btn-sm" to="/product" style="float:right"><i class="bi bi-eye"></i> Lihat Semua</router-link>
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
  import NavHeaderVue from '@/components/NavHeader.vue';
  import HeroPageVue from '@/components/HeroPage.vue';
  import CardProduct from '@/components/CardProduct.vue';
 
  import axios from 'axios';


export default {

  components:{
    NavHeaderVue,
    HeroPageVue,
    CardProduct,
    
  },
  data(){
    return{
      products:[]
    }
  },
  methods:{
    setProducts(data){
      this.products=data;
    }
  },
  mounted(){
    axios.get('http://localhost:3000/best-product')
    .then(response=>this.setProducts(response.data))
    .catch(error=>console.log(error));
  }
}
</script>
