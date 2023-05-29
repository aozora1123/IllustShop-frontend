// accountMixin.js
export default {
    data() {
        return {
            apiHost: process.env.VUE_APP_API_HOST,
            apiPort: process.env.VUE_APP_API_PORT,
        };
    },
    methods: {
        async registerAccount(data) {
            return await fetch(`${this.apiHost}:${this.apiPort}/api/accounts/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status == 201) {
                        return response.json()
                            .then(result => {
                                return { success: true, username: result.username, token: result.token }
                            });
                    }
                    else {
                        return response.json()
                            .then(result => {
                                // 根據Django的auth模組預設回傳的錯誤格式，進行相關設定
                                if ('username' in result) {
                                    return { success: false, msg: result.username[0] }
                                }
                                if ('password' in result) {
                                    return { success: false, msg: result.password[0] }
                                }
                            });
                    }
                })
                .catch(error => {
                    return { success: false, msg: error }
                });
        },
        async loginAccount(data) {
            return await fetch(`${this.apiHost}:${this.apiPort}/api/accounts/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status == 200) {
                        return response.json()
                            .then(result => {
                                return { success: true, username: result.username, token: result.token }
                            });
                    }
                    else {
                        return response.json()
                            .then(result => {
                                // 根據Django自訂回傳的錯誤格式，進行相關設定
                                if ('message' in result) {
                                    return { success: false, msg: result.message }
                                }
                            });
                    }
                })
                .catch(error => {
                    return { success: false, msg: error }
                });
        },
    },
}