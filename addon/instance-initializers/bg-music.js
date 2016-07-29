import Ember from 'ember';


export function initialize(applicationInstance) {

    // Access the ENV object in the config/environment.js file
    const config = applicationInstance.resolveRegistration('config:environment');
    // Access the bg-music.js service
    const bgMusic = applicationInstance.lookup('service:bg-music');

    // If an audio src hasn't been set, throw a console error
    if (!config.musicURL) {
        throw "Must provide a url for addon";
    }

    // Create the audio element and set its src
    let audioElement = bgMusic.get('audioElement');
    audioElement.setAttribute('src', config.musicURL);

}

export default {
    name: 'bg-music',
    initialize
};
