var canvas = document.querySelector('canvas'),
    ctx    = canvas.getContext('2d');


//---------Settings : Behavior of Particles------------//

var particleNumbers = 250;
var particleVelocity = 0.4;
var pxRatio=window.devicePixelRatio;
var prevRatio=canvas.width/canvas.height;
var curRatio=prevRatio;
fitToContainer(canvas);
var documentHeight = canvas.height;
var documentWidth = canvas.width;
var particles = [];
var distanceToConnect = 150;
var distanceToConnectRatio = 100/distanceToConnect;

if(window.devicePixelRatio<1.5){
  particleNumbers = 175;
  distanceToConnect = 90;
  particleVelocity = 0.25;
  var drawArc = true;
}

createParticles(particles);
connectParticles(particles);

function loopParticles(particles){
  fitToContainer(canvas);
  if(curRatio!=prevRatio){
    createParticles(particles);
  }
  //console.log(pxRatio);
  moveParticles(particles);
}

setInterval(loopParticles, 30,particles,canvas);

//--------------------------------------------------//
//---createParticles: creates particles coordinates---//
//--------------------------------------------------//
function createParticles(particles){

  for(cntI=0;cntI<particleNumbers;cntI++){
    particles[cntI]=[];

      var rndNumberForX = Math.floor((Math.random())*documentWidth+1 ),
          rndNumberForY = Math.floor((Math.random())*documentHeight+1 );
      var velX = Math.random();
      var velY = Math.random();
      var fDigit = velX.toString()[3];
      var secDigit = velY.toString()[3];

      if(fDigit%2==0){
      	velX*=particleVelocity;
      }else{
      	velX*=-particleVelocity;
      }
      if(secDigit%2==0){
        velY*=particleVelocity;
      }else{
        velY*=-particleVelocity;
      }
      particles[cntI][0]=rndNumberForX;// X Coordinates
      particles[cntI][1]=rndNumberForY;//Y Coordinates
      particles[cntI][2]=velX;//velocity on X axis
      particles[cntI][3]=velY;//velocity on Y axis
      //particles[cntI][2]=rndNumberForX+rndNumberForY; **
  }
//particles.sort(sortParticleArray);
return(particles);
}

//-----------------------------------------------------------------//
//----------connectParticles: connects at least 2 particles--------//
//----------------------------------------------------------------//
function connectParticles(particles){

  var distance;
  var currentParticle=0;
  var nextParticle;
  var pathColor;

  while(currentParticle<particleNumbers){

    for(cnt=0;cnt<particleNumbers;cnt++){
      nextParticle=cnt+1;
      if(nextParticle==particleNumbers){
        break;
      }
      distanceX=Math.abs(particles[currentParticle][0]-particles[nextParticle][0]);
      distanceY=Math.abs(particles[currentParticle][1]-particles[nextParticle][1]);
      if(distanceX<distanceToConnect && distanceY<distanceToConnect){
        ctx.beginPath();
        var pathColor;
        var x1Coord = particles[currentParticle][0];
        var y1Coord = particles[currentParticle][1];
        var x2Coord = particles[nextParticle][0];
        var y2Coord = particles[nextParticle][1];

        pathColor = colorizePathLine(currentParticle,nextParticle);
        ctx.lineWidth = 0.5;
        color = componentToHex(pathColor);
        color = "#"+color+color+color;
        ctx.strokeStyle = color;
        ctx.moveTo(x1Coord,y1Coord);
        ctx.lineTo(x2Coord,y2Coord);
        if(!drawArc){
          ctx.arc(x2Coord,y2Coord,4,0,2*Math.PI);

        }
        //ctx.fill();
        ctx.stroke();
      }
    }
      currentParticle++;

  }

}

//--------------------------------------------------------------------------------------------//
//----------moveParticles: moves particles with specific velocity and random direction--------//
//-------------------------------------------------------------------------------------------//
function moveParticles(array){

  for(i=0;i<particleNumbers;i++){
    if(array[i][0]>window.width || array[i][0]<0 || array[i][1]>canvas.height || array[i][1]<0){
      reCreateParticle(i,particles);
      /*if(array[i][0]<0 ){
        velX = Math.random()*1;
        //console.log(velX);
        array[i][0] = velX;
      }else if(array[i][0]>canvas.width){
        velX = Math.random()*(-1);
      }
      if(array[i][1] < 0){
        velY = Math.random()*1;
      }else if(array[i][1] > canvas.height){
        velY = Math.random()*(-1);
      }*/
    }else{
      array[i][0]+=array[i][2];
      array[i][1]+=array[i][3];
    }
  }
  ctx.clearRect(0, 0, canvas.offsetWidth*pxRatio, canvas.offsetHeight*pxRatio);
  connectParticles(array);
  return array;
}

//---------------------------------------------------------------------------------------------------//
//----------colorizePathLine: create a pseudo-opacity between the range of colors i ve chosen--------//
//--------------------------------------------------------------------------------------------------//
function colorizePathLine(currentParticle,nextParticle){

  var rangeRGB = 229;
  var distanceBetweenThemOnX = Math.abs(particles[currentParticle][0]-particles[nextParticle][0]);
  var distanceBetweenThemeOnY = Math.abs(particles[currentParticle][1]-particles[nextParticle][1]);

  if(distanceBetweenThemeOnY==0){
    var distancePercentage = distanceBetweenThemOnX * distanceToConnectRatio;
    var colorPercentage = 2.29 * distancePercentage;
    var color = colorPercentage * 2.29;
  }else{
    var distanceBetween = Math.round(Math.sqrt(Math.pow(distanceBetweenThemOnX,2) + Math.pow(distanceBetweenThemeOnY,2)));
    var distancePercentage = distanceBetween * distanceToConnectRatio;
    var colorPercentage = rangeRGB * distancePercentage / 100;
  }
var color = colorPercentage +13;//add 13 because our colorRange we want is between 13 and 229 on rgb
color = Math.round(color);
//console.log(color);
//if (color > 127 ){ color=color - 127; }
color = componentToHex(color);
return color;

}

//----------------------------------------------------------------//
//----------componentToHex: converst color from rgb to hex--------//
//---------------------------------------------------------------//
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//--------------------------------------------------------------------------------------------//
//----------reCreateParticle: when particles gets out of bounds,i redraw them randomly--------//
//-------------------------------------------------------------------------------------------//
function reCreateParticle(parNumber,partArray){

  var rndNumberForX = Math.floor((Math.random())*documentWidth+1 ),
      rndNumberForY = Math.floor((Math.random())*documentHeight+1 );
  var velX = Math.random();
  var velY = Math.random();
  var fDigit = velX.toString()[3];
  var secDigit = velY.toString()[3];

  if(fDigit%2==0){
    velX*=2.5;
  }else{
    velX*=-2.5;
  }
  if(secDigit%2==0){
    velY*=2.5;
  }else{
    velY*=-2.5;
  }
  particles[parNumber][0]=rndNumberForX;// X Coordinates
  particles[parNumber][1]=rndNumberForY;//Y Coordinates
  particles[parNumber][2]=velX;//velocity on X axis
  particles[parNumber][3]=velY;//velocity on Y axis
  //particles[cntI][2]=rndNumberForX+rndNumberForY;
  //ctx.fillRect(rndNumberForX,rndNumberForY,0,0);
  //return particles;
}

//-----------------------------------------------------------------//
//----------sortParticleArray: does nothing now--------//
//----------------------------------------------------------------//
/*
function sortParticleArray(a,b){

  if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }

}
*/

//-----------------------------------------------------------------//
//----------fitToContainer: fits canvas to current width-----------//
//----------------------------------------------------------------//
function fitToContainer(canvas){
  prevRatio=curRatio;
  curRatio=canvas.width/canvas.height;
  canvas.width  = canvas.offsetWidth*pxRatio;
  canvas.height = canvas.offsetHeight*pxRatio;
}
