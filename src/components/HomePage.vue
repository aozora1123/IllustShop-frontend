<template>
    <div class="container">
        <header>
            <h1><a class="no-style-link" href="https://illustshop.onrender.com">Illust Shop</a></h1>
        </header>
        <div class="content">
            <aside>
                <h2>貼圖分類</h2>

                <div class="list-group">
                    <router-link v-for="(category, index) in categories" :key="index" :to="`/products/${ category.name }`" class="list-group-item">
                        {{ category.name }}</router-link>
                </div>
            </aside>
            <div class="main">
                <router-view></router-view>
            </div>


        </div>
    </div>
</template>
  
<script>
export default {
    name: "HomePage",
    data() {
        return {
            categories: [],
        };
    },
    created() {
        fetch("https://illustshop-backend.onrender.com/api/products/categories")
            .then(response => response.json())
            .then(data => { this.categories = data })
            .catch(error => console.log(error))


    },

};
</script>
  
<style>
.container {
    margin: 0 auto;
}

header {
    background-color: #007bff;
    color: #fff;
    padding: 1em;
}

.content {
    display: flex;
}

aside {
    width: 20%;
    background-color: #f0f0f0;
    padding: 1em;
}

.main {
    width: 80%;
    margin: 2em;
}

.no-style-link {
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 继承父元素的颜色 */
}

.list-group-item {
    word-wrap: break-word;
}


</style>
  