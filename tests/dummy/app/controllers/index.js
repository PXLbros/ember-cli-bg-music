import Ember from 'ember';

export default Ember.Controller.extend({
    bgMusic: Ember.inject.service(),


    actions: {
        playMusic() {
            this.get('bgMusic').play();
        },

        stopMusic() {
            this.get('bgMusic').stop();
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
