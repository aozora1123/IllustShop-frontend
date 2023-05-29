<template>
    <div class="offset-3">
        <div v-if="loading">
            <h1>Loading...</h1>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div v-if="productInfo.length > 0">
                <h2>{{ category }} 分類的貼圖如下：</h2>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-10" v-for="(product, index) in productsOnCurrentPage" :key="index">
                        <div class="card d-flex px-1 my-2" style="height: 25rem;">
                            <div class="card-body" style="overflow: hidden;">
                                <div class="card-text px-2 py-2">
                                    <img v-lazy="product.imgsrc" class="card-img-top" :alt="product.name"
                                        style="height: 12rem">
                                    <b>貼圖名稱：</b>
                                    <h5 class="ellipsis" :title="product.name"> {{ product.name }}</h5>
                                </div>
                            </div>
                            <div class="justify-content-center">
                                <p class="price-text">價格: {{ product.price }} P</p>
                                <button class="btn btn-primary col-8 mx-3 my-1" type="submit"
                                    @click="addToCart(product.id)">加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>

                <nav aria-label="Page navigation">
                    <div class="btn-toolbar mb-3 justify-content-end" role="toolbar"
                        aria-label="Toolbar with button groups">
                        <div class="btn-group me-2" role="group" aria-label="First group">
                            <button v-for="(page, index) in pages" :key="index" type="button"
                                class="btn btn-outline-secondary" @click="changePage(index)"
                                :class="{ 'active': isActive[index] }">
                                {{ index + 1 }}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <div v-else>
                <h1> 很抱歉，{{ category }} 分類尚無貼圖</h1>
            </div>
        </div>
    </div>
</template>
<script>
import productMixin from '@/mixins/productMixin.js'
import commonMixin from '@/mixins/commonMixin.js'
import Message from 'vue-simple-notification'
import 'vue-simple-notification/dist/style.css'
export default {
    mixins: [
        productMixin,
        commonMixin
    ],
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
            try {
                this.productInfo = await this.fetchProductInfo(val)
                this.changePage(0);
                this.pages = await this.getPages();
            } catch (error) {
                alert('Error: ' + error)
            }
            this.loading = false;
        }
    },
    methods: {
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
        },
        addToCart(product_id) {
            this.checkLoginStatus()
            if (!this.isLogin) {
                alert('請先登入');
            }
            else {
                fetch(`${this.apiHost}:${this.apiPort}/api/cart/details`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ "product_id": product_id })
                })
                    .then(
                        response => {
                            return response.json().then(data => {
                                return {
                                    statusCode: response.status,
                                    data: data
                                };

                            })
                        })
                    .then(response => {
                        if (response.statusCode == 400 && response.data.exist == 'False') {
                            alert('Error: 未提供product_id');
                        }
                        else if (response.statusCode == 404 && response.data.existtt == 'False') {
                            alert('Error: 商品不存在');
                        }
                        else if (response.statusCode == 200 && response.data.exist == 'True') {
                            Message.info('商品已存在於購物車');
                        }
                        else if (response.statusCode == 200 && response.data.exist == 'False') {
                            Message.success('成功加入購物車');
                        }
                    })
                    .catch(error => {
                        alert('Error' + error.message);
                    });
            }
        }
    },
    async created() {
        this.productInfo = await this.fetchProductInfo(this.category);
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