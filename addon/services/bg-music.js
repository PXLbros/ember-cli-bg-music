import Ember from 'ember';


export default Ember.Service.extend({
    /*------------------------------------*\
      INIT
    \*------------------------------------*/
    init() {
        this._super(...arguments);

        // Create the audio element
        let audio = document.createElement('audio');
        audio.setAttribute('loop', true);
        this.set('audioElement', audio);

        // Handle the prefixing of the visibilitychange API
        this.get('prefixVisibilityChange').call(this);

        // Handle page visibility change
        document.addEventListener(this.get('visibilityChange'), this.get('handleVisibilityChange').bind(this), false);

        // GET THE CONFIG OBJECT
        this.set('configObject', Ember.getOwner(this).resolveRegistration('config:environment'));


    },

    // PROPERTY HOLDER FOR RETRIEVED `configObject`
    configObject: null,


    /*------------------------------------*\
      STATES
    \*------------------------------------*/

    // Track if it's playing
    isPlaying: false,

    //Track if it's muted
    isMuted: false,

    // Track is user has manually stopped the music
    isManualStop: false,

    // Track if page is visible or hidden
    hidden: null,

    // Vendor prefixed visibilitychange API
    visibilityChange: null,


    /*------------------------------------*\
      PASSIVE METHODS
    \*------------------------------------*/

    // Perform a browser check to handle prefixing for the visibilitychange API
    prefixVisibilityChange() {
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
            this.set('hidden', 'hidden');
            this.set('visibilityChange', 'visibilitychange');
        } else if (typeof document.mozHidden !== "undefined") {
            this.set('hidden', 'mozHidden');
            this.set('visibilityChange', 'mozvisibilitychange');
        } else if (typeof document.msHidden !== "undefined") {
            this.set('hidden', 'msHidden');
            this.set('visibilityChange', 'msvisibilitychange');
        } else if (typeof document.webkitHidden !== "undefined") {
            this.set('hidden', 'webkitHidden');
            this.set('visibilityChange', 'webkitvisibilitychange');
        }
    },

    // Detect when the page is visible or hidden
    handleVisibilityChange() {
        let audio = this.get('audioElement');

        if (document[this.get('hidden')]) {
            this.stopMusic();
        } else {
            if (this.configObject.playOnInit) {
                if (!this.get('isManualStop')) {
                    this.playMusic();
                }
            }
        }

    },


    /*------------------------------------*\
      REUSABLE METHODS
    \*------------------------------------*/

    turnOffManualStop(turnOffManualStop) {
        if (turnOffManualStop) {
            this.set('isManualStop', false);
        }
    },

    turnOnManualStop(turnOnManualStop) {
        if (turnOnManualStop) {
            this.set('isManualStop', true);
        }
    },


    /*------------------------------------*\
      ACTIONABLE METHODS
    \*------------------------------------*/

    // TOGGLE MUSIC
    toggleMusic(turnOnManualStop) {
        console.log(1);
        if (this.isPlaying) {
            this.stopMusic(turnOnManualStop);
        } else {
            this.playMusic(turnOnManualStop);
        }
    },

    // PLAY MUSIC
    playMusic(turnOffManualStop) {
        let audio = this.get('audioElement');
        audio.play();
        this.set('configObject.playOnInit', true);
        this.set('isPlaying', true);

        if (turnOffManualStop) {
            this.turnOffManualStop(turnOffManualStop);
        }

    },

    // STOP MUSIC
    stopMusic(turnOnManualStop) {
        let audio = this.get('audioElement');
        audio.pause();
        this.set('isPlaying', false);

        if (turnOnManualStop) {
            this.turnOnManualStop(turnOnManualStop);
        }

    },

    // MUTE MUSIC
    mute(turnOnManualStop) {
        let audio = this.get('audioElement');
        audio.muted = true;
        this.set('isMuted', true);

        this.turnOnManualStop(turnOnManualStop);
    },

    // UNMUTE MUSIC
    unmute(turnOffManualStop) {
        let audio = this.get('audioElement');
        audio.muted = false;
        this.set('isMuted', false);

        this.turnOffManualStop(turnOffManualStop);
    },

    // FADE OUT MUSIC
    fadeout(callback) {
        // some logic to fade in
        let audio = this.get('audioElement');
        Ember.$(audio).animate({volume: 0}, 1000, callback);
    },

    // FADE IN MUSIC
    fadein(callback) {
        let audio = this.get('audioElement');
        Ember.$(audio).animate({volume: 1}, 1000, callback);
    }

});
