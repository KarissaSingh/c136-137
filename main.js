video = "";
objects = [];
Status = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (Status != "") {
        Od.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                Od.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("object_status").innerHTML = object_name + " Not Found";
            }
        }
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    Od = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded ! ");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}