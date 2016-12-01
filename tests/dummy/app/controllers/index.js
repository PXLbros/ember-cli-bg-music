import Ember from 'ember';

export default Ember.Controller.extend({
    bgMusic: Ember.inject.service(),

    actions: {

        toggleMusic() {
            this.get('bgMusic').toggleMusic(true);
        },

        playMusic() {
            this.get('bgMusic').playMusic(true);
        },

        stopMusic() {
            this.get('bgMusic').stopMusic(true);
        },

        muteMusic() {
            this.get('bgMusic').mute();
        },

        unMuteMusic() {
            this.get('bgMusic').unmute();
        },

        fadeOutMusic() {
            this.get('bgMusic').fadeout();
        },

        fadeInMusic() {
            this.get('bgMusic').fadein(() => {
                this.send('playMusic');
            });
        }
    }

});
