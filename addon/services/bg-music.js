import Ember from 'ember';

export default Ember.Service.extend({
    init() {
        this._super(...arguments);

        let audio = document.createElement('audio');
//        audio.setAttribute('src', 'music.mp3');
        audio.setAttribute('loop', true);
        this.set('audioElement', audio);

  //      audio.play();
        this.set('isPlaying', true);

        // Stop music on window loose focusA
        Ember.$(window).on('focus', function() {
            console.log('in focus');
            audio.play();
        });

        Ember.$(window).on('blur', function() {
            console.log('out of focus');
            audio.pause();
        });
    },


    // Track if it's playing
    isPlaying: false,

    //Track if it's muted
    isMuted: false,

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
