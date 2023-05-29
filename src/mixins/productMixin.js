// productMixin.js
export default {
    data() {
        return {
            apiHost: process.env.VUE_APP_API_HOST,
            apiPort: process.env.VUE_APP_API_PORT,
            productCategories: [],
            productCategoriesIsLoading: true, // 控制loading時顯示的內容，避免Server閒置重啟時等待太久
        };
    },
    methods: {
        async fetchCategories() {
            return await fetch(`${this.apiHost}:${this.apiPort}/api/products/categories`)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
        async fetchProductInfo(category) {
            return await fetch(`${this.apiHost}:${this.apiPort}/api/products/by_category_name/${category}`)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
    },
    async created() {
        this.productCategoriesIsLoading = true;
        this.productCategories = await this.fetchCategories();
        this.productCategoriesIsLoading = false;
    }
}
