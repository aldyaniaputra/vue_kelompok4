<template>
  <NavHeaderVue :updateItemKeranjang="keranjangs" />
  <div class="container">
    <div class="row mt-4">
      <div class="col">
        <div class="bs-component">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/" href="#">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/product" href="#">Kosmetik</router-link>
            </li>
            <li class="breadcrumb-item active">Keranjang</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2 id="nav-breadcrumbs">Keranjang <strong>Saya</strong></h2>
        <div class="table-responsive mt-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Kosmetik</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Harga</th>
                <th scope="col">Total</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                    :src="'../assets/cosmetik/' + keranjang.products.gambar"
                    class="img-fluid shadow"
                    width="100"
                  />
                </td>
                <td>
                  {{ keranjang.products.nama }}
                </td>
                <td>
                  {{ keranjang.keterangan ? keranjang.keterangan : "-" }}
                </td>
                <td>
                  {{ keranjang.jumlah }}
                </td>
                <td>Rp. {{ keranjang.products.harga }}</td>
                <td>Rp. {{ keranjang.jumlah * keranjang.products.harga }}</td>
                <td class="text-danger" align="center">
                  <i class="bi bi-trash" @click="hapusitem(keranjang.id)"></i>
                </td>
              </tr>
              <tr style="boder: none !important">
                <td colspan="6" align="right" style="border-style: hidden">
                  Total Pembelian :
                </td>
                <td>Rp.{{ totalharga }}</td>
                <td style="border-style: hidden"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- form checkout -->

    <div class="row justify-content-end">
      <div class="col-md-4">
        <form v-on:submit.prevent class="">
          <div class="form-group">
            <label class="mb-2 mt-4">Nama</label>
            <input type="text" class="form-control" v-model="pesan.nama" />
          </div>
          <div class="form-group">
            <label class="mb-2 mt-2">Nomor Meja</label>
            <input
              type="text"
              class="form-control mb-2"
              v-model="pesan.noMeja"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @click="checkout"
            style="float: right"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeaderVue from "@/components/NavHeader.vue";
import axios from "axios";

export default {
  name: "keranjang",
  components: {
    NavHeaderVue,
  },
  data() {
    return {
      keranjangs: [],
      pesan: {},
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
      console.log(this.keranjangs);
    },
    hapusitem(id) {
      axios
        .delete("http://localhost:3000/keranjangs/" + id)
        .then(() => {
          alert("hapus data");
          //retrieve data terbaru
          axios
            .get("http://localhost:3000/keranjangs")
            .then((response) => this.setKeranjangs(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjang = this.keranjangs;
        this.pesan.keranjang;

        axios
          .post("http://localhost:3000/pesanans", this.pesan)
          .then(() => {
            this.keranjangs.map(function (item) {
              return axios
                .delete("http://localhost:3000/keranjangs/" + item.id)
                .catch((error) => console.log(error));
            });
            alert("sukses di pesan");
            this.$router.push({ path: "/sukses-pesan" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Nama dan No meja tidak boleh kosong");
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
      .then((response) => this.setKeranjangs(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    totalharga() {
      return this.keranjangs.reduce(function (items, data) {
        return items + data.products.harga * data.jumlah;
      }, 0);
    },
  },
};
</script>
