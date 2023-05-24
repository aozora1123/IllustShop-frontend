<template>
    <header class="sticky-top">
        <AppHeaderComponent></AppHeaderComponent>
    </header>
    <main>
        <div class="container">
            <div class="row justify-content-center">
                <h1 class="mx-3 my-3"> 搜尋的頁面不存在</h1>
            </div>
        </div>
    </main>
</template>
<script>
import AppHeaderComponent from '@/components/AppHeader.vue';
export default {
    components: {
        AppHeaderComponent,
    },
}
</script>