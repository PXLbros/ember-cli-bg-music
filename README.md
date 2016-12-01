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

---

# How To Use The Addon

## Initial Setup

In your Ember app's root directory run

`npm install ember-cli-bg-music --save`

Before the bg-music addon can work, you must first provide a path to the audio file for the addon to consume. To do this, navigate to the `config` folder and open the `environment.js` file. Inside the file you must define a `musicURL` property on the `ENV` object otherwise Ember will throw an error and your application won't load. The `musicURL` property takes as its value the path to the audio file. If you placed your audio file in the `public` directory, you can simply pass in the filename of the audio file as the value for the `musicURL` property. 

For example:

```js
config/environment.js
musicURL: "jazz.mp3"
``` 

Or if you placed your audio file in a subdirectory nth-level deep:

```js
config/environment.js
musicURL: "assets/jazz.mp3"
```

or

```js
config/environment.js
musicURL: "assets/audio/jazz.mp3"
```


## Play Your Background Music

The background music doesn't play on page load by default because in many cases it can be jarring when the page hasn't finished the initial load or if you want to first perform a preloader animation.

But if you do want your background music to play on page initialization, then in your `config/environment.js` file, you must define the `playOnInit` property and set it to `true`.

```js
config/environment.js
playOnInit: true
```

Now your background music should play on page initialization.

## Service

Note that Bg-music and all its properties and methods are defined on an Ember service object. To access the service, you must first define or "inject" the service into a controller or component. Because you want your background music to be available everywhere on your page, it'd be a good idea to just inject the Bg-music service into the application controller (which lives on the top-level of an Ember app and can pass data and actions anywhere down your page).

For example, if your page doesn't already have an application controller file generated, then go ahead and generate it:

`ember generate controller application`

This should create an `application.js` file in your `app/controllers` folder. Open the file and inject the Bg-music service:

```js
app/controllers/application.js
bgMusic: Ember.inject.service()
```
Now you should have full access to Bg-music's methods and properties!

## Methods

Bg-music provides eight methods out of the box:

1. `play(turnOffManualStop)`

Plays or resumes the background music.

e.g.

```js
this.get('bgMusic').play()
```

Note that `bgMusic` is the property name of the Ember injected service

2. `stop(turnOnManualStop)`

Stops the background music completely.

Bg-music automatically turns off the background music when the page is out of focus (like when the user tabs or navigates away from the page) and then turns the background music back on when the page is back in focus. Passing in `true` will make sure that if the user had explicitly turned off the background music, the background music will stay turned off when the page is back in focus. 

For example let's say you define an action method called `stopMusic()` that is called whenever the user clicks an element to turn off the background music. If you want the background music to stay turned off when the page is out of focus and later back in focus, then you'd want to use `stop()` and pass in `true`.

```js
stop(true);
```

Be aware that if you pass in `true` for `stop()`, you should remember to pass in `true` for `play()` as well to let the addon know that the background music will play when the page is back in focus.

```js
stop(true);
play(true);
```

---

Sets the `isManualStop` property to false. You want to do this if the user has explicitly turned the background music back on.

3. `mute(turnOnManualStop)`

Mutes the background music but does not stop it.

4. `unmute(turnOffManualStop)`

Unmutes the background music.

5. `fadeout()`

Gradually mutes the background music but does not stop it.

6. `fadein()`

Gradually unmutes the background music.
