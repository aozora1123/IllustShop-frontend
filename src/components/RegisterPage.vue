<template>
    <header class="sticky-top">
        <AppHeaderComponent></AppHeaderComponent>
    </header>
    <main>
        <div class="container my-3">
            <div class="row justify-content-center" v-show="!isSuccessful">
                <h2>會員註冊</h2>
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
                                required="required" v-model="password1">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword" class="col-sm-2 col-form-label">確認密碼:</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword2" placeholder="確認密碼"
                                required="required" v-model="password2">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" id="registerButton">註冊</button>
                </form>
            </div>
            <div class="row justify-content-center my-3">
                <div id="liveAlertPlaceholder" class="col-lg-6 col-md-8 col-10"></div>
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
            password1: "",
            password2: "",
            isValid: true,
            isSuccessful: false,
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();
            var errMsg = this.validateUserData();
            // 前端驗證輸入資料
            if (errMsg != null) {
                this.appendAlertElement('liveAlertPlaceholder', errMsg, 'danger')
            }
            else {
                var data = {
                    "username": this.username,
                    "password": this.password1
                }
                // 後端驗證輸入資料
                var registerResult = await this.registerAccount(data);
                if (registerResult.success) {
                    window.localStorage.setItem('username', registerResult.username)
                    window.localStorage.setItem('token', registerResult.token)
                    this.isSuccessful = true;
                    this.appendAlertElement('liveAlertPlaceholder', '註冊成功! 3秒後自動跳轉至首頁', 'success')
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 3500);
                }
                else {
                    this.appendAlertElement('liveAlertPlaceholder', registerResult.msg, 'danger')
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
            if (!regex.test(this.password1) || !regex.test(this.password2)) {
                errMsg = "密碼不可包含特殊字元";
                this.isValid = false;
            }
            if (this.password1 != this.password2) {
                errMsg = "輸入的密碼不一致";
                this.isValid = false;
            }
            return errMsg
        },
        resetForm() {
            this.username = this.password1 = this.password2 = "";
            this.isValid = true;
        },

    },

}
</script>