const playPauseButton = document.getElementById("play-pause-image")
let transcriptionResult = ""
const recognition = new webkitSpeechRecognition();
const video = document.getElementById("video")

const initialOptions = {
  // lang: "id-ID",
  lang: "en-US",
  continuous: true,
  interimResults: true,
  // onend: reset(),
};

Object.assign(recognition, initialOptions);

recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    //only display the final transcript
    transcriptionResult = [...event.results].map((result) => result[0].transcript)
  }

  subtitleResult()
};


function playFile() {
  const blob = localforage.getItem('myfile').then(blob => {
    if (!blob) {
      return;
    }
    const videoSrc = URL.createObjectURL(blob)
    video.src = videoSrc
    video.play()
    recognition.start()    
    playPauseButton.style.display = "none"
    start(video)
  }).catch(e => console.log(e));
}

function fastForward(seconds) {
  video.currentTime += parseInt(seconds)
}

function rewind(seconds) {
  video.currentTime -= parseInt(seconds)
}
/*function pauseFile() {
  const blob = localforage.getItem('myfile').then(blob => {
    if (!blob) {
      return;
    }
    const audio = new Audio(URL.createObjectURL(blob));
    recognition.start()    
    buttonChanger()
    audio.pause()
  }).catch(e => console.log(e));
} */

function subtitleResult() {
  document.getElementById("Subtitle").innerHTML = transcriptionResult;
}

function start(audio) {
    const progressBar = document.getElementById("audio-play-progress")
    const currentTime = document.getElementById("timestamp-current")
    const totalTime = document.getElementById("timestamp-totaltime")

    setInterval(() => {
      // update current time
      currentTime.textContent = parseInt(audio.currentTime)
      totalTime.textContent = parseInt(audio.duration)
      // update progress bar
      progressBar.value = audio.currentTime * 100 /audio.duration
    }, 1000)
}

function buttonChanger() {
  if (playPauseButton.src="./images/Group 144.svg")
  {
    console.log(playPauseButton)
    playPauseButton.src="./images/Pause button.svg";
  }
  else
  {
    playPauseButton.src="./images/Group 144.svg";
  }
}
