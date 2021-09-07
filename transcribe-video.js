const largePlayButton = document.getElementById("large-play-button")
const playPauseButton = document.getElementById("play-pause-image")
const recognition = new webkitSpeechRecognition();
const video = document.getElementById("video")

let videoIsPlaying = false
let transcriptionResult = ""
let previousTranscriptionResult = ""

const initialOptions = {
  // lang: "id-ID",
  lang: localStorage.getItem("bahasa"),
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

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
  var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function playFile() {
  const blob = localforage.getItem('myfile').then(blob => {
    if (!blob) {
      return;
    }
    const videoSrc = URL.createObjectURL(blob)
    video.src = videoSrc
    video.play()
    recognition.start()
    largePlayButton.style.display = "none"
    start(video)
    buttonChanger("pause")
    videoIsPlaying = true
  }).catch(e => console.log(e));
}

function toggleVideo() {
  if(videoIsPlaying) {
    video.pause();
    buttonChanger("play")
    recognition.stop()
    previousTranscriptionResult = previousTranscriptionResult + " " + transcriptionResult
  } else {videoIsPlaying
    video.play()
    buttonChanger("pause")
    recognition.start()
  }

  videoIsPlaying = !videoIsPlaying
}


function fastForward(seconds) {
  video.currentTime += parseInt(seconds)
}

function rewind(seconds) {
  video.currentTime -= parseInt(seconds)
}

function downloadText() {
  const finalText = getFinalTranscriptionResult()

  saveTextAsFile(finalText, "testfile.txt")
}

function subtitleResult() {
  const finalText = getFinalTranscriptionResult()
  
  document.getElementById("Subtitle").innerHTML =  finalText
}

function secondsToTimestamp(seconds) {
  // var hours = Math.floor(seconds / 60 / 60);
  var minutes = Math.floor(seconds / 60)
  var seconds = seconds % 60;
  var formatted = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

  return formatted
}

function start(audio) {
  const progressBar = document.getElementById("audio-play-progress")
  const currentTime = document.getElementById("timestamp-current")
  const totalTime = document.getElementById("timestamp-totaltime")



  setInterval(() => {
    // update current time
    currentTime.textContent = secondsToTimestamp(parseInt(audio.currentTime))
    totalTime.textContent = secondsToTimestamp(parseInt(audio.duration))
    // update progress bar
    progressBar.value = audio.currentTime * 100 / audio.duration
  }, 1000)
}

function buttonChanger(action) {
  switch(action) {
    case "play":
      playPauseButton.src = "./images/playButtonBlack.svg";
      break;
    case "pause":
      playPauseButton.src = "./images/pauseButtonBlack.svg";
      break
    default:
      //asdsadasd
  }
}


function getFinalTranscriptionResult() {
  let finalText = previousTranscriptionResult
  if(videoIsPlaying) {
    finalText += + " " + transcriptionResult
  }
  return finalText
}