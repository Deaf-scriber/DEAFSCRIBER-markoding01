const playPauseButton = document.getElementById("play-pause-button")
let transcriptionResult = ""
const recognition = new webkitSpeechRecognition();

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
    const audio = new Audio(URL.createObjectURL(blob));
    recognition.start()    

    audio.play()
    start(audio)
  }).catch(e => console.log(e));
}

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
    playPauseButton.src="./images/Pause button.svg";
  }
  else
  {
    playPauseButton.src="./images/Group 144.svg";
  }
}
