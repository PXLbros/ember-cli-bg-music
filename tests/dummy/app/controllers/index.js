import Ember from 'ember';

export default Ember.Controller.extend({
    bgMusic: Ember.inject.service(),


    actions: {
        playMusic() {
            this.get('bgMusic').play();
        },

        stopMusic() {
            this.get('bgMusic').stop();
        }
    }
});
