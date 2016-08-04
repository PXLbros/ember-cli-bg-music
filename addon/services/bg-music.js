import Ember from 'ember';

export default Ember.Service.extend({
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

    },

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


    /*
     * Passive methods
     */

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
            this.get('stop').call(this);
        } else {
            if (!this.get('isManualStop')) {
                this.get('play').call(this);
            }
        }

    },

    /*
     * Reusable methods
     */

    turnOffManualStop(turnOffManualStop) {
        if (turnOffManualStop === "turnOffManualStop") {
            this.set('isManualStop', false);
        }
    },

    turnOnManualStop(turnOnManualStop) {
        if (turnOnManualStop === "turnOnManualStop") {
            this.set('isManualStop', true);
        }
    },

    /*
     * Actionable methods
     */

    // Play music
    play(turnOffManualStop) {
        let audio = this.get('audioElement');
        audio.play();
        console.log('Play Music');
        this.set('isPlaying', true);

        this.get('turnOffManualStop').call(this, turnOffManualStop);
    },

    // Stop music
    stop(turnOnManualStop) {
        let audio = this.get('audioElement');
        audio.pause();
        this.set('isPlaying', false);

        this.get('turnOnManualStop').call(this, turnOnManualStop);
    },

    // Mute music
    mute(turnOnManualStop) {
        let audio = this.get('audioElement');
        audio.muted = true;
        this.set('isMuted', true);

        this.get('turnOnManualStop').call(this, turnOnManualStop);
    },

    // Unmute music
    unmute(turnOffManualStop) {
        let audio = this.get('audioElement');
        audio.muted = false;
        this.set('isMuted', false);

        this.get('turnOffManualStop').call(this, turnOffManualStop);
    },

    // Fade out
    fadeout(callback) {
        // some logic to fade in
        let audio = this.get('audioElement');
        Ember.$(audio).animate({volume: 0}, 1000, callback);
    },

    // Fade in
    fadein(callback) {
        let audio = this.get('audioElement');
        Ember.$(audio).animate({volume: 1}, 1000, callback);
    }

});
