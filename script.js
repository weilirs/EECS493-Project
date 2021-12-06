Vue.config.devtools = true
var createPageView = new Vue({
    el: '#app',
    data: {
        showCreate: false,
        showCreateSuccess: false,
        showFilter: false,
        showHome: true,
        joinConfirmPage: false,
        eventName: null,
        eventType: null,
        eventCals: null,
        eventTutorial: null,
        yourName: null,
        address: null,
        date: null,
        time: null,
        duration: null,
        gameDscp: null,
        joinParticipantName: null,
        events: [],
        eventTypes: {},
        retEvents:[],
    },
    methods: {
        showCreatePage () {
            this.showCreate = true;
            this.showHome = false;
            var today = new Date().toISOString().split('T')[0];
            document.getElementsByName("date")[0].setAttribute('min', today);
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
                this.retEvents[index].participantVisible = false;
                this.retEvents[index].joinPage = false;
                this.retEvents[index].joinConfirmPage = false;
                this.retEvents[index].isVisible = false;
                this.retEvents[index+1].isVisible = true;
            }
        },

        // switch to previous event
        preEvent (index) {
            if(index > 0){
                this.retEvents[index].participantVisible = false;
                this.retEvents[index].joinPage = false;
                this.retEvents[index].joinConfirmPage = false;
                this.retEvents[index].isVisible = false;
                this.retEvents[index-1].isVisible = true;
            }
        },

        // return to homepage from join event page
        joinPageBack () {
            for(let i=0; i<this.retEvents.length;i++){
                this.retEvents[i].isVisible = false;
                this.retEvents[i].participantVisible = false;
                this.retEvents[i].joinPage = false;
                this.retEvents[i].joinConfirmPage = false;
            }
            this.showHome = true;
        },

        // show place to enter name to join event
        joinShowName (index) {
            this.retEvents[index].joinPage = true;
        },

        joinEventHandler (index) {
            this.retEvents[index].participants.push(this.joinParticipantName);
            this.joinParticipantName = null;
            this.retEvents[index].joinPage = false;
            this.retEvents[index].joinConfirmPage = true;
        },

        // back button for confirming joining an event
        joinConfirmBack (index) {
            this.retEvents[index].joinConfirmPage = false;
        },

        // report an event

        joinReport(index) {
            this.retEvents[index].reported = true;
        },

        clearForm () {
            this.eventName = null;
            this.eventType = null;
            this.yourName = null;
            this.address = null;
            this.date = null;
            this.time = null;
            this.duration = null;
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

            let apiAddr = this.address.split(' ').join('+');
            let apiUrl = "https://www.google.com/maps/embed/v1/place?q=" + apiAddr + "&key=AIzaSyCoBbJGfGZmi2b01d9clRvmGxg-kcvDhW0";

            this.eventType = this.eventType.toLowerCase();

            let participantList = [];
            participantList.push(this.yourName);

            let event = {eventName: this.eventName, type: this.eventType, yourName: this.yourName, address: this.address, apiURL: apiUrl, participants: participantList, participantVisible: false, joinPage: false,
            joinConfirmPage: false, date: this.date, time: this.time, duration: this.duration, description: this.gameDscp, isVisible: false, eventCals: this.eventCals, eventTutorial: this.eventTutorial, reported: false};
            this.events.push(event);
            if (this.eventType in this.eventTypes) {
                this.eventTypes[this.eventType] = this.eventTypes[this.eventType] + 1;
            }
            else {
                this.eventTypes[this.eventType] = 1;
            }
            this.showCreate = false;
            this.showCreateSuccess = true;

            console.log(event);
        },

        seeParticipants (index) {
            this.retEvents[index].participantVisible = true; 
        },

        closeParticipants (index) {
            this.retEvents[index].participantVisible = false; 
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
                    this.eventTutorial = "https://www.wikihow.com/Start-Running";
                    break;
                case "GOLF":
                    this.eventCals = 305;
                    this.eventTutorial = "https://en.wikipedia.org/wiki/Golf#Rules_and_regulations";
                    break;
                case "CYCLING":
                    this.eventCals = 344;
                    this.eventTutorial = "https://www.wikihow.com/Ride-a-Bicycle";
                    break;
                case "BADMINTON":
                    this.eventCals = 394;
                    this.eventTutorial = "https://en.wikipedia.org/wiki/Badminton#Rules";
                    break;
                case "CALISTHENICS":
                    this.eventCals = 573;
                    this.eventTutorial = "https://www.healthline.com/health/fitness-exercise/calisthenics";
                    break;
                case "KAYAKING":
                    this.eventCals = 358;
                    this.eventTutorial = "https://www.wikihow.com/Kayak";
                    break;
                case "CANOEING":
                    this.eventCals = 286;
                    this.eventTutorial = "https://www.wikihow.com/Canoe";
                    break;
                case "TENNIS":
                    this.eventCals = 523;
                    this.eventTutorial = "https://en.wikipedia.org/wiki/Tennis#Manner_of_play";
                    break;
                case "VOLLEYBALL":
                    this.eventCals = 286;
                    this.eventTutorial = "https://en.wikipedia.org/wiki/Volleyball#Rules_of_the_game";
                    break;
                case "SKATEBOARDING":
                    this.eventCals = 358;
                    this.eventTutorial = "https://www.wikihow.com/Skateboard";
                    break;
                case "FRISBEE":
                    this.eventCals = 215;
                    this.eventTutorial = "https://www.wikihow.com/Throw-a-Frisbee";
                    break;

                //feel free to add more

                default:
                    this.eventCals = null;
                    this.eventTutorial = null;
            }


        },

        grayPrevButton(index) {
            if (index - 1 < 0) {
                return true;
            }
        },
        grayNextButton(index) {
            if (index + 1 >= this.retEvents.length) {
                return true;
            }
        },
    }
})