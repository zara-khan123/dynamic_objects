img = "";
status = "";
object = [];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    
}

function modelLoaded()
{
    console.log("model Loaded");
    status = true;
    
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {  
        objectDetector.detect(video, gotresults);
        for(i = 0; i < object.length; i++)
        {
           r = random(255);
           g = random(255);
           b = random(255);
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects are:"+objects.length;
        fill(rgb);
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
        noFill();
        stroke(rgb);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
    }
    
    /*fill("#ff0000");
    text("Dog" , 45, 75);
    noFill();
    stroke("#ff0000");
    rect(30, 60, 450, 350);

    fill("#ff0000");
    text("Cat" , 320, 120);
    noFill();
    stroke("#ff0000");
    rect(300, 90, 270, 320);*/
}

function gotresults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting object";
}