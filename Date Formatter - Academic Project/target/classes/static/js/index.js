//CLOCK DRAWING AND FUNCTIONS
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// DATE FORMATTER

//GLOBAL VARIABLES DECLARATION
var date;
var timestamp;
var toUTC;
var toISO;

//FUNCTION CALLED BY THE BUTTON IN THE INDEX PAGE TO SEND AN HTTP REQUEST AND GET THE RESULT
function translateDates(){
    date = new Date();
    timestamp = date.getTime();
    document.getElementById('timestamp').innerHTML = "<b>"+timestamp+"</b>";

      var http = new XMLHttpRequest();
      //declaration of variables to make an HTTP request
      var api = '/timestamp/';
      var url = api
      +encodeURIComponent(timestamp);
      console.log(url);

    http.open('GET', url, true);
    
    http.onreadystatechange = function (){

      if (http.readyState === 4 && http.status === 200){
  
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        var dateUTC = responseJSON.utc;
        var dateISO = responseJSON.iso;

        toUTC = "The timestamp <b>"+timestamp+"</b> converted to UTC is equal to: <b>"+dateUTC+"</b>";
        toISO = "The timestamp <b>"+timestamp+"</b> converted to ISO is equal to: <b>"+dateISO+"</b>";

        document.getElementById('utc').innerHTML = toUTC;
        document.getElementById('iso').innerHTML = toISO;
      }else if (http.status !== 200){  //ERROR TREATMENT FOR HTTP STATUS CODES DIFFERENT FROM SUCCESS
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        var status = responseJSON.status;
        var error = responseJSON.error;
        var message = responseJSON.message;
        var stringText = "An error was found. <br><b>Error code:</b> "+status+"<br><b>Type: </b>"+error+"<br><b>Message: </b>"+message;
        document.getElementById('error').innerHTML = stringText;
      }
    };

      http.send();
  }