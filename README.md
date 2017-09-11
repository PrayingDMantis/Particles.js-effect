**Particle.js effect**


## Demo on 4k resolution 

![4k](https://raw.githubusercontent.com/PrayingDMantis/Particles.js-effect/master/demo/asset/imgs/4k-particle-effect.png)

## Demo on fhd resolution
![4k](https://raw.githubusercontent.com/PrayingDMantis/Particles.js-effect/master/demo/asset/imgs/fhd-particle-effect.png)

#### How to use
Link css in head ```<link rel="stylesheet" type="text/css" href="css/particle.css">```
Create canvas in html 
```
<div id="canvasContainer">
  <canvas id="canvas">Your Browser does not support HTML5.</canvas>
</div>
```
#### Settings in js

Change the default number of particles,velocity and the distance in order to connect by changing the values described below:

``` 
var particleNumbers = 250;
var particleVelocity = 0.4;
var distanceToConnect = 150;
```
**Options for difference resolutions**
```
if(window.devicePixelRatio<1.5){
    particleNumbers = 175;
    distanceToConnect = 90;
    particleVelocity = 0.25;
  }
 ```
