<template>
    <header class="sticky-top">
        <AppHeaderComponent></AppHeaderComponent>
    </header>
    <main>
        <div>
            <div class="container">
                <div class="row">
                    <div class="bg-info col-sm-2 my-4 px-2 py-3">
                        <h2 class="text-center">貼圖分類</h2>
                        <div class="list-group">
                            <router-link v-for="(category, index) in productCategories" :key="index"
                                :to="`/products/${category.name}`" class="list-group-item text-break">
                                {{ category.name }}</router-link>
                        </div>
                    </div>
                    <div class="col-8 my-4 mx-4">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AppHeaderComponent from '@/components/AppHeader.vue';
import ProductMixin from '@/mixins/ProductMixin.js'
export default {
    components: {
        AppHeaderComponent,
    },
    mixins: [
        ProductMixin,
    ],  
}
</script>

