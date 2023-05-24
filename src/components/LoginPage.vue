<template>
    <header class="sticky-top">
        <AppHeaderComponent></AppHeaderComponent>
    </header>
    <main>


        <div class="container my-3">
            <div v-if="isLogin">
                <h2>您已經登入了</h2>
            </div>
            <div v-else>
                <div class="row justify-content-center" v-show="!isSuccessful">
                    <h2>會員登入</h2>
                    <form class="col-lg-6 col-md-8 col-10" @submit="onSubmit($event)">
                        <div class="row mb-3">
                            <label for="inputUsername" class="col-sm-2 col-form-label">使用者名稱:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputUsername" placeholder="請輸入使用者名稱"
                                    required="required" v-model="username">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword" class="col-sm-2 col-form-label">密碼:</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputPassword1" placeholder="請輸入密碼"
                                    required="required" v-model="password">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" id="loginButton">登入</button>
                    </form>
                </div>
                <div class="row justify-content-center my-3">
                    <div id="liveAlertPlaceholder" class="col-lg-6 col-md-8 col-10"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AppHeaderComponent from '@/components/AppHeader.vue';
import accountMixin from '@/mixins/accountMixin.js'
import commonMixin from '@/mixins/commonMixin.js'
export default {
    components: {
        AppHeaderComponent,
    },
    mixins: [
        accountMixin,
        commonMixin,
    ],
    data() {
        return {
            username: "",
            password: "",
            isValid: true,
            isSuccessful: false,
        }
    },
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();
            // 前端驗證輸入資料
            var errMsg = this.validateUserData();
            if (errMsg != null) {
                this.appendAlertElement('liveAlertPlaceholder', errMsg, 'danger')
            }
            else {
                var data = {
                    "username": this.username,
                    "password": this.password
                }
                // 後端驗證輸入資料
                var loginResult = await this.loginAccount(data);
                if (loginResult.success) {
                    window.localStorage.setItem('username', loginResult.username)
                    window.localStorage.setItem('token', loginResult.token)
                    this.isSuccessful = true;
                    this.appendAlertElement('liveAlertPlaceholder', '登入成功! 3秒後自動跳轉至首頁', 'success')
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 3500);
                }
                else {
                    this.appendAlertElement('liveAlertPlaceholder', loginResult.msg, 'danger')
                }
            }
            this.resetForm();
        },
        validateUserData() {
            var errMsg = null;
            var regex = /^[a-zA-Z0-9_]+$/;
            if (!regex.test(this.username)) {
                errMsg = "使用者名稱不可包含特殊字元";
                this.isValid = false;
            }
            if (!regex.test(this.password)) {
                errMsg = "密碼不可包含特殊字元";
                this.isValid = false;
            }
            return errMsg
        },
        resetForm() {
            this.username = this.password = "";
            this.isValid = true;
        },

    },

}
</script>