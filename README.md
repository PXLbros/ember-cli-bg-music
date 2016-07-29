# Ember-cli-bg-music

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

# How To Use The Addon

## Initial Setup

Before the bg-music addon can work, you must first provide a path to the audio file for the addon to consume. To do this, navigate to the `config` folder and inside it open the `environment.js` file. Inside the file you have to define a `musicURL` property on the `ENV` object. The `musicURL` property takes as its value the path to the audio file. If you placed your audio file in the `public` directory, you can simply pass the filename of the audio file in as the `musicURL` value. 

For example:

`musicURL: jazz.mp3` 

Or if you placed your audio file in a subdirectory nth-level deep:

`musicURL: assets/jazz.mp3`

or

`musicURL: assets/audio/jazz.mp3`


## Play Your Audio

The background music doesn't play on page load by default because in many cases it can be jarring when the document hasn't finished loading or if you want to first perform a preloader animation.

