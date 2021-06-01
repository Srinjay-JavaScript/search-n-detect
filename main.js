status = " ";
object = "";
objects = [];

foundBoolean = false;
notFoundBoolean = false;
function preload(){

}
function setup(){
 canvas = createCanvas(700, 500);
 canvas.center();
 video = createCapture(VIDEO);
 video.center();
 video.hide();
}
function draw(){
  image(video, 0, 0, 700, 500);
  if (status != " "){
    detector.detect(video, get_result);
     for(i=0; i<objects.length;i++){
       
            foundBoolean = true;
            document.getElementById("status").innerHTML = "Status: Object Found";
            document.getElementById("final").innerHTML = object + " found";
            x = objects[i].x;
            y = objects[i].y;
            w = objects[i].width;
            h = objects[i].height;
            percent = floor(objects[i].confidence * 100);
            n = objects[i].label;
            fill("red");
            text(n + " Confidence: " + percent, x + 15, y + 15);
            textStyle(BOLD);
            noFill();
            stroke("red")
            rect(x, y, w, h);
            if (objects[i].label == object){
            video.stop();
            detector.detect(get_result);
            var speaker = window.speechSynthesis;
            var recording = new SpeechSynthesisUtterance(object + " is found. ");

            speaker.speak(recording);
        }
        else {
          document.getElementById("status").innerHTML = "Status: Object Not Found 404";
          document.getElementById("final").innerHTML = object + " not found";
        }
       
     }
       
  }
  
}

// function speak(){
//    if (foundBoolean == true){
//       var speaker = window.speechSynthesis;
//       var recording = new SpeechSynthesisUtterance(object + " is found. ");
     
//       console.log("Success");
//       foundBoolean = false;
//      }
//      else if (notFoundBoolean == true) {
//        var machine = window.speechSynthesis;
//       recording = new SpeechSynthesisUtterance(object + " is not found. ");
//       machine.speak(recording);
//       document.getElementById("status").innerHTML = "Status: Object Not Found 404";
//       document.getElementById("final").innerHTML = object + " not found";
//        console.log("Failure");
//        notFoundBoolean = false;
//      }
// }


function start(){
  object = document.getElementById("object_input").value;
  detector = ml5.objectDetector('cocossd', init);
  document.getElementById("status").innerHTML = "Status: Detecting Object";
  
}

function init(){
  console.log("COCOSSD Initialized.");
  status = true;
}

function get_result(error, results){
  if (error){
    console.error(error);
  }
  else{
    console.log(results);
    objects = results;
   
  }
}


