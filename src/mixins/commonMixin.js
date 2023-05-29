// commonMixin.js
export default {
    data() {
        return {
            username: "",
            isLogin: false,
            apiHost: process.env.VUE_APP_API_HOST,
            apiPort: process.env.VUE_APP_API_PORT,
        }
    },
    methods: {
        appendAlertElement(alertPlaceholderID, message, alertType) {
            var alertPlaceholder = document.getElementById(alertPlaceholderID)
            var wrapper = document.createElement('div')
            wrapper.innerHTML = '<div id="alertInfo" class="alert alert-' + alertType + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
            alertPlaceholder.append(wrapper)
            // 3秒後自動刪除前次的警告訊息
            setTimeout(function () {
                var alertElement = document.getElementById('alertInfo');
                if (alertElement) {
                    alertElement.remove();
                }
            }, 3500);
        },
        checkLoginStatus(){
            var username = window.localStorage.getItem('username')
            var token = window.localStorage.getItem('token')
            if (username != null && token != null) {
                this.username = username
                this.isLogin = true
            }
        }
    },
}