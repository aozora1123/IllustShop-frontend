// ProductMixin.js
export default {
    data() {
        return {
            apiHost: process.env.VUE_APP_API_HOST,
            productCategories: [],
        };
    },
    methods: {
        async fetchCategories() {
            return await fetch(`${this.apiHost}/api/products/categories`)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
        async fetchProductInfo(category) {
            return await fetch(`${this.apiHost}/api/products/by_category_name/${category}`)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
    },
    async created() {
        this.productCategories = await this.fetchCategories();
    }
}
