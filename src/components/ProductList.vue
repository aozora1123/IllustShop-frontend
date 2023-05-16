<template>
    <div v-if="productInfo.length > 0">
        <h1>{{ category }} 分類的貼圖如下：</h1>
        <div class="row">
            <div class="col col-10 col-sm-6 col-md-4 col-lg-3" v-for="(product, index) in productsOnCurrentPage"
                :key="index">
                <div class="card">
                    <div class="card-body">
                        <div class="card-text">
                            <img :src="product.imgsrc" class="card-img-top" :alt="product.name">
                            <b class="card-title">貼圖名稱：</b>
                            <h5 class="ellipsis" :title="product.name"> {{ product.name }}</h5>

                        </div>

                    </div>
                    <p class="price-text">價格: {{ product.price }} P</p>

                </div>
            </div>
        </div>
        <ul class="changePage">
            <li v-for="(page, index) in pages" :key="index" class="changePage">
                <button @click="changePage(index)" :class="{ 'active': isActive[index] }">{{ index + 1 }}</button>
            </li>
        </ul>
    </div>
    <div v-else>
        <h1> 很抱歉，{{ category }} 分類尚無貼圖</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            productInfo: {},
            pages: [],
            pageIndex: 0,
            isActive: [],
        }
    },
    computed: {
        category() {
            return this.$route.params.category;
        },
        productsOnCurrentPage() {
            return this.pages[this.pageIndex]
        }
    },
    watch: {
        category: async function (val) {
            this.productInfo = await this.fetchProductInfo(val)
            this.changePage(0);
            this.pages = await this.getPages();
        }
    },
    methods: {
        async fetchProductInfo(category) {
            return await fetch("https://illustshop-backend.onrender.com/api/products/by_category_name/" + category)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
        async getPages() {
            const productsPerPage = 4;
            const pageCount = Math.ceil(this.productInfo.length / productsPerPage);
            const pages = [];
            for (let i = 0; i < pageCount; i++) {
                pages.push(this.productInfo.slice(i * productsPerPage, (i + 1) * productsPerPage));
            }
            return pages;
        },
        changePage(pageNumber) {
            this.pageIndex = pageNumber;
            this.isActive.fill(false);
            this.isActive[this.pageIndex] = true; // 標示目前選擇的頁數
        }
    },
    async created() {
        this.productInfo = await this.fetchProductInfo(this.category);
        this.pageIndex = 0;
        this.pages = await this.getPages();
        this.isActive[this.pageIndex] = true;
    }
}
</script>
<style>
.card {
    margin: 0.5rem
}

.card-body {
    height: 18rem;
    overflow: hidden;
}

.card-body img {
    height: 12rem;
}

.card-title {
    font-size: 1rem;
    margin: 1rem 1rem 1rem 0;
}

.card-text {
    flex-grow: 1;
}

.price-text {
    float: left;
    margin: 1rem 0 1rem 1rem;
}

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}

ul.changePage {
    margin: 1rem;
    float: right;
}

li.changePage {
    list-style-type: none;
    float: left;
}

.active {
    font-weight: bold;
}
</style>