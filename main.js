song = ""
leftWristX = 0
rightWristX = 0
leftWristY = 0
rightWristY = 0
scoreRightWrist = 0
scoreLeftWrist = 0
function setup(){
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
	posenet = ml5.poseNet(video , modeloaded)
	posenet.on("pose" , gotPoses)

}
function draw(){
image(video,0,0,600,500);
fill("red")
stroke("red")
if(scoreLeftWrist > 0.20){


circle(leftWristX, leftWristY, 20)
inNumber = Number(leftWristY)
removeDecimals = floor(inNumber)
volume = removeDecimals/1000
volume1 = volume*2
document.getElementById("volume").innerHTML = "volume=" + volume1
song.setVolume(volume1)
}
if(scoreRightWrist > 0.2){
circle(rightWristX, rightWristY, 20)
if(rightWristY > 0 && rightWristY < 100){
	document.getElementById("speed").innerHTML  = "speed = 0.5x"
	song.rate(0.5)
}
if(rightWristY > 100 && rightWristY < 200){
	document.getElementById("speed").innerHTML  = "speed = 1x"
	song.rate(1)
}
if(rightWristY > 200 && rightWristY < 300){
	document.getElementById("speed").innerHTML  = "speed = 1.5x"
	song.rate(1.5)
}
if(rightWristY > 300 && rightWristY < 400){
	document.getElementById("speed").innerHTML  = "speed = 2x"
	song.rate(2)
}
if(rightWristY > 400 && rightWristY < 500){
	document.getElementById("speed").innerHTML  = "speed = 2.5x"
	song.rate(2.5)
}
}
}
function preload(){
    song = loadSound("music.mp3");
}
function play(){
song.play();
song.setVolume(0.1)
song.rate(1)
}
function modeloaded(){
	console.log("posenet is initiallized")
}
function gotPoses(results){
	console.log(results)
	scoreLeftWrist = results[0].pose.keypoints[9].score
	leftWristX= results[0].pose.leftWrist.x
	leftWristY = results[0].pose.rightWrist.y
	rightWristX= results[0].pose.rightWrist.x
	rightWristY = results[0].pose.rightWrist.y

}