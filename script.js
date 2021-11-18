Vue.config.devtools = true
var createPageView = new Vue({
    el: '#app',
    data: {
        showCreate: false,
        showCreateSuccess: false,
        showFilter: false,
        showJoin: false,
        showHome: true,
        eventName: null,
        eventType: null,
        yourName: null,
        address: null,
        date: null,
        time: null,
        gameDscp: null,
        events: [],
        eventTypes: {},
    },
    methods: {
        showCreatePage () {
            this.showCreate = true;
            this.showHome = false;
        },

        showFilterPage () {
            this.showHome = false;
            this.showFilter = true;
        },

        showJoinPage () {
            this.showJoin = true;
            this.showHome = false;
        },

        createPageBack () {
            this.showCreate = false;
            this.showHome = true;
        },

        filterPageBack () {
            this.showFilter = false;
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
            if (this.eventType in this.eventTypes) {
                this.eventTypes[this.eventType] = this.eventTypes[this.eventType] + 1;
            }
            else {
                this.eventTypes[this.eventType] = 1;
            }
            this.showCreate = false;
            this.showCreateSuccess = true;
        }
    }
})