<template>
    <header class="sticky-top">
        <AppHeaderComponent></AppHeaderComponent>
    </header>
    <main>

        <div class="container">
            <div class="row">
                <div v-if="isLoading">
                    <div class="spinner-border my-4" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else>
                    <div v-if="products.length == 0">
                        <h2 class="my-4">購物車中沒有商品</h2>
                    </div>
                    <div v-else>
                        <h2 class="my-4">購物車中包含以下商品:</h2>
                        <table class="table">
                            <caption>購物車清單</caption>
                            <thead>
                                <tr>
                                    <th scope="col">編號</th>
                                    <th scope="col">商品外觀</th>
                                    <th scope="col">商品名稱</th>
                                    <th scope="col">價格</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>
                                        <img v-lazy="product.imgsrc" :alt="product.name" style="height: 4rem">
                                    </td>
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.price }} P</td>
                                    <td><button class="btn btn-danger text-center col-6 mx-3 my-2 " type="submit"
                                            @click="deleteProduct(product.id)">刪除</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="table-primary">
                                    <td>總價: </td>
                                    <td colspan="2"></td>
                                    <td>{{ this.totalPrice }} P</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import AppHeaderComponent from '@/components/AppHeader.vue';
import commonMixin from '@/mixins/commonMixin.js'
export default {
    components: {
        AppHeaderComponent,
    },
    mixins: [
        commonMixin,
    ],
    data() {
        return {
            products: [],
            totalPrice: 0,
            isLoading: true,
        }
    },

    async mounted() {
        this.isLoading = true;
        this.checkLoginStatus();
        await this.getUserCartProducts()
            .then(data => {
                this.products = data.products;
                this.totalPrice = 0;
                for (let i = 0; i < this.products.length; i++) {
                    this.totalPrice += this.products[i].price;
                }
            })
            .catch(error => {
                alert('Error' + error.message);
            })
        this.isLoading = false;
    },
    methods: {
        getUserCartProducts() {
            return fetch(`${this.apiHost}:${this.apiPort}/api/cart/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            })
                .then(
                    response => {
                        if (!response.ok) {
                            return { error: 'no product', data: [] };
                        }
                        return response.json()
                    }
                )
                .then(data => {
                    if (data.error) {
                        return { products: [] }
                    }
                    return { products: data.products }
                })
                .catch(error => {
                    alert('Error' + error.message);
                    return { products: [] }
                });
        },
        deleteProduct(product_id) {
            this.checkLoginStatus();
            fetch(`${this.apiHost}:${this.apiPort}/api/cart/details/${product_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    if (response.status == 204) {
                        location.reload(true);
                    }
                    else {
                        throw new Error;
                    }
                })
                .catch(error => {
                    alert('Error' + error.message);
                });
        }
    }
}
</script>

<style>
th {
    vertical-align: middle;
}

td {
    vertical-align: middle;
}
</style>