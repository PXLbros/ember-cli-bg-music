import Ember from 'ember';

export default Ember.Controller.extend({
    bgMusic: Ember.inject.service(),

    actions: {
        playMusic() {
            this.get('bgMusic').play(true);
        },

        stopMusic() {
            this.get('bgMusic').stop(true);
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
