var infoBox; 
var tempBox; 
var chineseBox;
var startStopButton; 
var recognizing = false; 
var mouth = ['','ㄅ','ㄅ','ㄆ','ㄆ','ㄇ','ㄇ','ㄈ','ㄈ','ㄉ','ㄉ','ㄊ','ㄊ','ㄋ','ㄋ','ㄌ','ㄌ','ㄍ','ㄎ','ㄏ','ㄐ','ㄑ','ㄒ','ㄓ','ㄔ','ㄕ','ㄖ','ㄗ','ㄘ','ㄙ','ㄚ','ㄛ','ㄜ','ㄝ','ㄞ','ㄞ','ㄟ','ㄟ','ㄠ','ㄠ','ㄡ','ㄡ','ㄢ','ㄢ','ㄣ','ㄣ','ㄤ','ㄤ','ㄥ','ㄥ','ㄦ','ㄦ','ㄧ','ㄨ','ㄩ'];

function startButton(event) {
  infoBox = document.getElementById("infoBox");
  tempBox = document.getElementById("tempBox"); 
  chineseBox = document.getElementById("chineseBox"); 
  startStopButton = document.getElementById("startStopButton"); 
  langCombo = document.getElementById("langCombo"); 
  if (recognizing) { 
    tempBox.innerHTML = '...'; 
    recognition.stop();
  } else { 
    tempBox.innerHTML = '...請開始說話...'; 
    recognition.lang = 'cmn-Hant-TW';
    recognition.start();
  }
}

if (!('webkitSpeechRecognition' in window)) {  
  infoBox.innerText = "本瀏覽器不支援語音辨識，請更換瀏覽器！(Chrome 25 版以上才支援語音辨識)";
} 
if (!('speechSynthesis' in window)) {
  infoBox.innerText = "本瀏覽器不支援語音合成，請更換瀏覽器！(Chrome 33 版以上才支援語音辨識)";
}
else {
  var recognition = new webkitSpeechRecognition(); 
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() { 
    recognizing = true; 
    startStopButton.value = "stop"; 
    //infoBox.innerText = "...請開始說話...";  
  };

  recognition.onend = function() { 
    recognizing = false;
    startStopButton.value = "start";  
    tempBox.innerHTML = '...'; 
    //infoBox.innerText = "支援"; 
  };

  recognition.onresult = function(event) {
    var interim_transcript = ''; 
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      interim_transcript += event.results[i][0].transcript;
    }
    if (interim_transcript.trim().length > 0) 
        tempBox.innerText = interim_transcript;
        var chinese = pinyinUtil.getPinyin(interim_transcript);
        chineseBox.innerText = chinese;
  };
}
function speakButton(event) {
  let vid = document.getElementById("mouthvideo");
  vid.playbackRate = 10;
  var msg = new SpeechSynthesisUtterance('語音輸入測試');
  window.speechSynthesis.speak(msg);
  var chinese = pinyinUtil.getPinyin('語音輸入測試');
  chineseBox = document.getElementById("chineseBox");
  console.log(chinese);
  chineseBox.innerText = chinese;
  chinese = new String(chinese).split(' ')
  console.log(chinese);
  var index = 0;
        let speakanimation = setInterval(() => {
            if (index >= chinese.length-1)clearInterval(speakanimation);
            //for (var i = 0; i< chinese[index].length; i++){
              switch(chinese[index][0]){
                case' ': case'ˋ': case'ˇ': case'ˊ': case'ˉ': break;
                case undefined:    
                  mouthdom.src = "./image/mouth-1.png";
                  break;
                default:
                  changeimg(chinese,index,0);
              }
            //}
            index++;
        }, 250);
}

var changeimg = function (chinese,index,i){
  var mouthdom = document.getElementById("mouth");
  var mouthvideo = document.getElementById("mouthvideo");
  console.log(chinese[index][i] ,mouth.indexOf(chinese[index][i]));
  mouthdom.src = "./image/mouth-"+mouth.indexOf(chinese[index][i])+".png"
  mouthvideo.setAttribute('src',  "./video/document_"+mouth.indexOf(chinese[index][i])+".mp4");
  mouthvideo.setAttribute('playbackRate', '10');
}


/*
笙
1. 語音輸入後調 gpt api
2. 語音對到auido to face
3. python 對 auido to face 及時操作

曈
1. 共編github
2. 整理前端的東東
4. 前端 對街後端 python 

*/