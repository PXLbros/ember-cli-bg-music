import Ember from 'ember';


export function initialize(applicationInstance) {
    const config = applicationInstance.resolveRegistration('config:environment');
    const bgMusic = applicationInstance.lookup('service:bg-music');
    
    if(!config.musicURL)
        throw "Must provide a url for addon";

    let audioElement = bgMusic.get('audioElement');
    audioElement.setAttribute('src', config.musicURL);

    audioElement.play();
}

export default {
    name: 'bg-music',
    initialize
};
