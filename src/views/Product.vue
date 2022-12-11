<template>
  <h2 style="text-align: center">Our Product</h2>
  <div class="products">
    <div class="card" v-for="(product, index) in productData" :key="index">
      <img src="../assets/jeans3.jpg" alt="Denim Jeans" style="width: 100%" />
      <h1>{{ product.name }}</h1>
      <p class="price">{{ product.stock.sale_price }}</p>
      <p>{{ product.description }}</p>
      <p><button>Add to Cart</button></p>
    </div>
    <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Product",
  components: {},
  data() {
    return {
      page: 1,
      loading: false,
    };
  },
  methods: {
    getProducts() {
      this.loading = true;
      console.log("getProducts");
      this.$store
        .dispatch("allProducts", this.page)
        .then((response) => {
          console.log("response" + response);
          this.loading = false;
        })
        .catch((error) => {
          console.log("error" + error);
          this.loading = false;
        });
    },
  },
  computed: {
    products() {
      return this.$store.getters.allProducts;
    },
    productData() {
      return this.$store.getters.allProductData;
    },
  },
  mounted() {
    window.onscroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (clientHeight + scrollTop >= scrollHeight - 5) {
        this.page++;
        if (this.products && this.products.meta.last_page >= this.page) {
          this.getProducts();
        }
      }
    };
    this.getProducts();
  },
};
</script>

<style>
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.loading {
  text-align: center;
  position: fixed;
  color: #fff;
  z-index: 9;
  background: purple;
  padding: 8px 18px;
  border-radius: 5px;
  left: 50%;
  top: 50%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>