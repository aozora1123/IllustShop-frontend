<template>
    <div class="offset-3">
        <div v-if="loading">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <div v-if="productInfo.length > 0">
                <h2>{{ category }} 分類的貼圖如下：</h2>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-10" v-for="(product, index) in productsOnCurrentPage" :key="index">
                        <div class="card d-flex px-1 my-2" style="height: 22rem;">
                            <div class="card-body" style="overflow: hidden;">
                                <div class="card-text px-2 py-2">
                                    <img :src="product.imgsrc" class="card-img-top" :alt="product.name"
                                        style="height: 12rem">
                                    <b>貼圖名稱：</b>
                                    <h5 class="ellipsis" :title="product.name"> {{ product.name }}</h5>
                                </div>
                            </div>
                            <p class="price-text px-3">價格: {{ product.price }} P</p>
                        </div>
                    </div>
                </div>
                <ul class="float-end">
                    <li v-for="(page, index) in pages" :key="index" class="float-start" style="list-style-type: none;">
                        <button @click="changePage(index)" :class="{ 'active': isActive[index] }">{{ index + 1 }}</button>
                    </li>
                </ul>
            </div>
            <div v-else>
                <h1> 很抱歉，{{ category }} 分類尚無貼圖</h1>
            </div>
        </div>
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
            loading: true // 控制loading時顯示的內容，避免切換分類時productInfo的數量暫時為0，而短暫顯示沒有元素
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
            this.loading = true;
            const apiHost = process.env.VUE_APP_API_HOST;
            this.productInfo = await this.fetchProductInfo(apiHost, val)
            this.loading = false;
            this.changePage(0);
            this.pages = await this.getPages();
        }
    },
    methods: {
        async fetchProductInfo(apiHost, category) {
            return await fetch(`${apiHost}/api/products/by_category_name/${category}`)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
        async getPages() {
            const productsPerPage = 6;
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
        const apiHost = process.env.VUE_APP_API_HOST;
        this.productInfo = await this.fetchProductInfo(apiHost, this.category);
        this.loading = false;
        this.pageIndex = 0;
        this.pages = await this.getPages();
        this.isActive[this.pageIndex] = true;
    }
}
</script>
<style>
.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.active {
    font-weight: bold;
}
</style>