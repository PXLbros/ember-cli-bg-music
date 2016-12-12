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

        // GET THE CONFIG OBJECT
        this.set('configObject', Ember.getOwner(this).resolveRegistration('config:environment'));

        // Handle page visibility change
        document.addEventListener(this.get('visibilityChange'), this.get('handleVisibilityChange').bind(this, true), false);

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


    // DETECT WHEN THE PAGE IS VISIBLE OR HIDDEN
    handleVisibilityChange(forcedFlag) {
        let audio = this.get('audioElement');

        // IF USER TABS AWAY, STOP THE MUSIC
        if (document[this.get('hidden')]) {
            this.stopMusic();
        } else {
            // IF USER TABS BACK AND THE MUSIC HAS FINISHED LOADING
            if (this.configObject.playOnInit) {
                // IF THE MUSIC HAD NOT BEEN MANUALLY STOPPED
                if (!this.get('isManualStop')) {
                    // THEN PLAY THE MUSIC
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

    // TOGGLE FADE MUSIC
    toggleFadeMusic(turnOnManualStop) {
        if (this.isPlaying) {
            this.fadeOutMusic(turnOnManualStop);
        } else {
            this.fadeInMusic(turnOnManualStop);
        }
    },

    // FADE OUT MUSIC
    fadeOutMusic(turnOnManualStop) {
        let self = this;
        // some logic to fade in
        let audio = this.get('audioElement');
        Ember.$(audio).animate({volume: 0}, 1000, function() {
            self.stopMusic(turnOnManualStop);
        });
    },

    // FADE IN MUSIC
    fadeInMusic(turnOffManualStop) {
        let audio = this.get('audioElement');
        this.playMusic(turnOffManualStop);
        Ember.$(audio).animate({volume: 1}, 1000, function() {

        });
    }

});
