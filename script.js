Vue.config.devtools = true
var createPageView = new Vue({
    el: '#app',
    data: {
        showCreate: false,
        showCreateSuccess: false,
        showJoin: false,
        showHome: true,
        eventName: null,
        eventType: null,
        yourName: null,
        address: null,
        date: null,
        time: null,
        gameDscp: null,
        events: []
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
        },

        joinPageBack () {
            this.showJoin = false;
            this.showHome = true;
        },

        clearForm () {
            this.eventName = null;
            this.eventType = null;
            this.yourName = null;
            this.address = null;
            this.date = null;
            this.time = null;
            this.gameDscp = null;
            $('#eventForm')[0].reset();
        },

        createSuccessHome () {
            this.showCreateSuccess = false;
            this.showHome = true;
            this.clearForm();
        },

        createEventHandler () {
            let event = {eventName: this.eventName, type: this.eventType, yourName: this.yourName, address: this.address, date: this.date, time: this.time, description: this.gameDscp};
            this.events.push(event);
            this.showCreate = false;
            this.showCreateSuccess = true;
        }
    }
})