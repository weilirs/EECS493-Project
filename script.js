Vue.config.devtools = true
var createPageView = new Vue({
    el: '#app',
    data: {
        showCreate: false,
        showCreateSuccess: false,
        showFilter: false,
        showJoin: [false,false],
        showHome: true,
        eventName: null,
        eventType: null,
        eventCals: null,
        eventTutorial: null,
        yourName: null,
        address: null,
        date: null,
        time: null,
        gameDscp: null,
        events: [],
        eventTypes: {},
        retEvents:[],
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

        createPageBack () {
            this.showCreate = false;
            this.showHome = true;
        },

        filterPageBack () {
            this.showFilter = false;
            this.showHome = true;
        },

        // choose an event type from the filter
        choose (name) {
            this.showFilter = false;
            this.retEvents = []
            for(let i=0; i<this.events.length;i++){
                if (this.events[i].type == name){
                    this.retEvents.push(this.events[i]);
                }
            }
            this.retEvents[0].isVisible = true;
        },

        // switch to next event 
        nextEvent (index) {
            if(index < this.retEvents.length - 1){
                this.retEvents[index].isVisible = false;
                this.retEvents[index+1].isVisible = true;
            }
        },

        // switch to previous event
        preEvent (index) {
            if(index > 0){
                this.retEvents[index].isVisible = false;
                this.retEvents[index-1].isVisible = true;
            }
        },

        // return to homepage from join event page
        joinPageBack () {
            for(let i=0; i<this.retEvents.length;i++){
                this.retEvents[i].isVisible = false;
            }
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
            this.identifyEvent();

            let event = {eventName: this.eventName, type: this.eventType, yourName: this.yourName, address: this.address, date: this.date, time: this.time, description: this.gameDscp, isVisible: false};
            this.events.push(event);
            if (this.eventType in this.eventTypes) {
                this.eventTypes[this.eventType] = this.eventTypes[this.eventType] + 1;
            }
            else {
                this.eventTypes[this.eventType] = 1;
            }
            this.showCreate = false;
            this.showCreateSuccess = true;
        },

        //function for recognizing activities for offering calorie information and instructions
        //calorie data taken from https://captaincalculator.com/health/calorie/calories-burned-playing-soccer-calculator/
        //calorie data assumes a weight of 150 lbs
        identifyEvent () {
            let checkThis = this.eventType.toUpperCase();

            switch(checkThis){
                case "SOCCER":
                    this.eventCals = 501;
                    this.eventTutorial = "https://en.wikipedia.org/wiki/Association_football#Gameplay";
                    break;
                case "BASKETBALL":
                    this.eventCals = 465;
                    this.eventTutorial = "https://en.wikipedia.org/wiki/Basketball#Rules_and_regulations";
                    break;
                case "RUNNING":
                    this.eventCals = 573;
                    this.eventTutorial = "You know how to run already dumbbass";
                    break;
                default:
                    this.eventCals = null;
                    this.eventTutorial = null;
            }


        }
    }
})