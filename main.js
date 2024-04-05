x=0
y=0

da=""
screenwidth=0
screenheight=0
apple=""
speakdata=""
tonumber=0

var SpeechRecognition=window.webkitSpeechRecognition
var recognition=new SpeechRecognition()

function preload(){
   apple=loadImage("apple.png")

}

function setup(){
    screenwidth=window.innerWidth
    screenheight=window.innerHeight
  canvas=createCanvas(screenwidth,screenheight-150)
  canvas.position(0,150)
}

function draw(){
   if(da=="set"){
      for(var i=1; i <=tonumber; i++){
        x=Math.floor(Math.random()*700)
        y=Math.floor(Math.random()*400)
        image(apple,x,y,50,50)
      }
      document.getElementById("status").innerHTML=tonumber+"  apples drawn"
      speakdata=tonumber+"  apples drawn"
      speak()
      da=""
   }
}

function start(){
   document.getElementById("status").innerHTML="System is listening,please tell a number"
   recognition.start()

}


recognition.onresult=function(event){
    console.log(event)
    var content=event.results[0][0].transcript
    document.getElementById("status").innerHTML="the speech has been recognised as "+content
    tonumber=Number(content)
    if(Number.isInteger(tonumber)){
        
        document.getElementById("status").innerHTML="started drawing apple"
        da="set"
    }

   else{
    document.getElementById("status").innerHTML=" the speech has not recognised a number."
   }


}


function speak(){
    var synth=window.speechSynthesis
    var utterthis= new SpeechSynthesisUtterance(speakdata)
    synth.speak(utterthis)
    speakdata=""
}

