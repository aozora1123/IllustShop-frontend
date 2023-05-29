<template>
    <header class="sticky-top">
        <AppHeaderComponent></AppHeaderComponent>
    </header>
    <main>
        <div class="container">
            <div v-if="productCategoriesIsLoading" class="my-5">
                <h1>Loading...</h1>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else>
                <div class="row justify-content-center">
                    <h2 class="my-3">請選擇貼圖分類：</h2>
                    <div v-for="(category, index) in productCategories" :key="index"
                        class="card bg-light text-primary text-break d-flex position-relative my-lg-4 my-2 mx-lg-4 mx-2"
                        style="width: 18rem;">
                        <div class="card-body ">
                            <a :href="`/products/${category.name}`"
                                class="fs-4 fw-bold mx-2 my-2 text-decoration-none stretched-link">
                                {{ category.name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AppHeaderComponent from '@/components/AppHeader.vue';
import productMixin from '@/mixins/productMixin.js'
export default {
    components: {
        AppHeaderComponent,
    },
    mixins: [
        productMixin,
    ],
}
</script>