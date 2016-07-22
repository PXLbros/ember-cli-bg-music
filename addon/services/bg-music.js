import Ember from 'ember';

export default Ember.Service.extend({
    init() {
        this._super(...arguments);

        let audio = document.createElement('audio');
        audio.setAttribute('src', 'FILENAME HERE');
        this.set('audioElement', audio);

        // Stop music on window loose focus
        Ember.$('window').on('looseFocus', () => {
            this.stop();
        });

        // Same thing for re focus
    },


    // Track if it's playing
    isPlaying: false,


    // Play music
    play() {
        let audio = this.get('audio');
        // audio.play();
        console.log('Play Music');
        this.set('isPlaying', true);
    },


    // Stop music
    stop() {
        let audio = this.get('audio');
        // audio.pause();
        console.log('Stop Music');
        this.set('isPlaying', false);
    }
});
