const playPauseButton = document.getElementById("play-pause-image")
let transcriptionResult = ""
const recognition = new webkitSpeechRecognition();

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

function buttonChanger() {
  if (playPauseButton.src="./images/Group 144.svg")
  {
    console.log(playPauseButton)
    playPauseButton.src="./images/Pause button.svg";
  }
  else if (playPauseButton.src != "./images/Group 144.svg")
  {
    console.log(playPauseButton)
    playPauseButton.src="./images/Group 144.svg";
  }
}


let audio

function playFile() {
  const blob = localforage.getItem('myfile').then(blob => {
    if (!blob) {
      return;
    }
    audio = new Audio(URL.createObjectURL(blob));
    recognition.start()    
    buttonChanger()
    audio.play()
    start(audio)
  }).catch(e => console.log(e));
}

function pauseAudio() {
  audio.pause()
}

function fastForward(seconds) {
  audio.currentTime += parseInt(seconds)
}

function rewind(seconds) {
  audio.currentTime -= parseInt(seconds)
}

function downloadText() {
  saveTextAsFile(transcriptionResult, "testfile.txt")
}

// coba bikin fungsi rewinds() ya

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
    progressBar.value = audio.currentTime * 100 /audio.duration
  }, 1000)
}


