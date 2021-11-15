Vue.config.devtools = true
var createPageView = new Vue({
    el: '#app',
    data: {
        showCreate: false,
        showJoin: false,
        showHome: true,
        eventName: null,
        yourName: null,
        address: null,
        date: null,
        time: null,
        gameDscp: null,
    },
    methods: {
        showCreatePage () {
            this.showCreate = true;
            this.showHome = false;
        },

        showJoinPage () {
            this.showJoin = true;
            this.showHome = false;
        },

        createPageBack () {
            this.showCreate = false;
            this.showHome = true;
        }
    }
})