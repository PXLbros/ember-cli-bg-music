import Ember from 'ember';


export default Ember.Service.extend({
    /*------------------------------------*\
      INIT
    \*------------------------------------*/
    init() {
        let self = this;
        this._super(...arguments);

        // Create the audio element
        let audio = document.createElement('audio');
        audio.setAttribute('loop', true);
        this.set('audioElement', audio);

        // Handle the prefixing of the visibilitychange API
        // this.get('prefixVisibilityChange').call(this);

        // GET THE CONFIG OBJECT
        this.set('configObject', Ember.getOwner(this).resolveRegistration('config:environment'));

        // Handle page visibility change
        document.addEventListener(this.getVisibilityEvent(), this.handleVisibilityChange(), false);

        // extra event listeners for better behaviour
        document.addEventListener('focus', function() {
            self.handleVisibilityChange(true);
        }, false);

        document.addEventListener('blur', function() {
            self.handleVisibilityChange(false);
        }, false);

        window.addEventListener('focus', function() {
            self.handleVisibilityChange(true);
        }, false);

        window.addEventListener('blur', function() {
            self.handleVisibilityChange(false);
        }, false);

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

    browserPrefixes: ['moz', 'ms', 'o', 'webkit'],

    isVisible: true,


    /*------------------------------------*\
      PASSIVE METHODS
    \*------------------------------------*/

    getHiddenPropertyName(prefix) {
        return (prefix ? prefix + 'Hidden' : 'hidden');
    },

    getVisibilityEvent(prefix) {
        return (prefix ? prefix : '') + 'visibilitychange';
    },

    getBrowserPrefix() {
        for (var i = 0; i < this.browserPrefixes.length; i++) {
            if (this.getHiddenPropertyName(this.browserPrefixes[i]) in document) {
            // return vendor prefix
                return this.browserPrefixes[i];
            }
        }

        // no vendor prefix needed
        return null;
    },

    onVisible() {
        // prevent double execution
        if (this.isVisible) {
            return;
        }

        // change flag value
        this.isVisible = true;
        console.log('visible');

        if (this.configObject.playOnInit) {
            // IF THE MUSIC HAD NOT BEEN MANUALLY STOPPED
            if (!this.get('isManualStop')) {
                // THEN PLAY THE MUSIC
                this.playMusic();
            }
        }
    },

    onHidden() {
        // prevent double execution
        if (!this.isVisible) {
            return;
        }

        // change flag value
        this.isVisible = false;
        console.log('hidden');

        this.stopMusic();
    },

    handleVisibilityChange(forcedFlag) {
        // forcedFlag is a boolean when this event handler is triggered by a
        // focus or blur eventotherwise it's an Event object
        if (typeof forcedFlag === "boolean") {
            if (forcedFlag) {
                return this.onVisible();
            }

            return this.onHidden();
        }

        if (document[this.getHiddenPropertyName(this.getBrowserPrefix())]) {
            return this.onHidden();
        }

        return this.onVisible();
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
