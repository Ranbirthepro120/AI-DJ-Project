spinnin = "";
chatter = "";
spinnin_status = "";
chatter_status = "";
right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_score = 0;
left_wrist_score = 0;
status = "";

function preload()
{
    spinnin = loadSound("Spinnin.mp3");
    chatter = loadSound("Chatter.mp3");
}
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function draw()
{
    image(video, 0, 0, 600, 500)
    
    spinnin_status = spinnin.isPlaying();
    chatter_status = chatter.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");
    if(left_wrist_score > 0.2)
    {
        circle(left_wrist_x, left_wrist_y, 20);
        chatter.stop();

        if(spinnin_status == false)
    {
        spinnin.play();
        document.getElementById("song").innerHTML = "Playing - Spinnin by Connor Price";
    }
    }
    if(right_wrist_score > 0.2)
    {
        circle(right_wrist_x, right_wrist_y, 20);
        spinnin.stop();

        if(chatter_status == false)
        {
            chatter.play();
            document.getElementById("song").innerHTML = "Playing - Chatter by Connor Price";
        }
    }

}
function modelLoaded()
{
    console.log("Model is Loaded!");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        right_wrist_score = results[0].pose.keypoints[10].score;
        left_wrist_score = results[0].pose.keypoints[9].score;
        console.log("Right Wrist Score = " + right_wrist_score + ", Left Wrist Score = " + left_wrist_score);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + right_wrist_x + ", Right Wrist Y = " + right_wrist_y);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + left_wrist_x + ", Left Wrist Y = " + left_wrist_y);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}