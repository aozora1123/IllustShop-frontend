<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand text-white" href="/">IllustShop</a>
                <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active text-white fw-bold" aria-current="page" href="/">首頁</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-white fw-bold" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                貼圖分類
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li v-for="(category, index) in productCategories" :key="index">
                                    <a class="dropdown-item" :href="`/products/${category.name}`">
                                        {{ category.name }}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import ProductMixin from '@/mixins/ProductMixin.js'

export default {
    mixins: [
        ProductMixin,
    ],
}
</script>