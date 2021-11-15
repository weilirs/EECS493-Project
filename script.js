Vue.config.devtools = true
var createPageView = new Vue({
    el: '#app',
    data: {
        showCreate: false,
        showHome: true
    },
    methods: {
        showCreatePage () {
            console.log("Hi");
            this.showCreate = true;
            this.showHome = false;
        }
    }
})