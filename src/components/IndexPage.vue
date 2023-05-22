<template>
    <header class="sticky-top">
        <AppHeaderComponent></AppHeaderComponent>
    </header>
    <main>
        <ProductPageComponent></ProductPageComponent>
    </main>
</template>

<script>
import AppHeaderComponent from '@/components/AppHeader.vue';
import ProductPageComponent from '@/components/ProductPage.vue';
export default {
    components: {
        AppHeaderComponent,
        ProductPageComponent,
    },

}
</script>