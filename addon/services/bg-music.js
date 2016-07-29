import Ember from 'ember';

// let hidden;
// let visibilityChange;

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

    // Track if page is visible or hidden
    hidden: null,

    // Vendor prefixed visibilitychange API
    visibilityChange: null,

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
            this.get('unmute').call(this);
        } else {
            this.get('mute').call(this);
        }

    },

    // Play music
    play() {
        let audio = this.get('audioElement');
        audio.play();
        console.log('Play Music');
        this.set('isPlaying', true);
    },

    // Stop music
    stop() {
        let audio = this.get('audioElement');
        audio.pause();
        console.log('Stop Music');
        this.set('isPlaying', false);
    },

    // Mute music
    mute() {
        let audio = this.get('audioElement');
        audio.muted = true;
        console.log('Mute Music');
        this.set('isMuted', true);
    },

    // Unmute music
    unmute() {
        let audio = this.get('audioElement');
        audio.muted = false;
        console.log('Unmute music');
        this.set('isMuted', false);
    },

    // Fade out
    fadeout(callback) {
        // some logic to fade in
        let audio = this.get('audioElement');
        Ember.$(audio).animate({volume: 0}, 1000, callback);
        console.log('Fade out music');
    },

    // Fade in
    fadein(callback) {
        let audio = this.get('audioElement');
        Ember.$(audio).animate({volume: 1}, 1000, callback);
        console.log('Fade in music');
    }

});
