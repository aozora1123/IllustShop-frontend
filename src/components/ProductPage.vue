<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="bg-primary col-sm-2 my-4 px-2 py-3">
                    <h2 class="text-center">貼圖分類</h2>
                    <div class="list-group">
                        <router-link v-for="(category, index) in categories" :key="index" :to="`/products/${category.name}`"
                            class="list-group-item text-break">
                            {{ category.name }}</router-link>
                    </div>
                </div>
                <div class="col-8 my-4 mx-4">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
        };
    },
    created() {
        const apiHost = process.env.VUE_APP_API_HOST;
        fetch(`${apiHost}/api/products/categories`)
            .then(response => response.json())
            .then(data => { this.categories = data })
            .catch(error => console.log(error))
    },
}
</script>

