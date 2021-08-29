const uploadFIle = document.getElementById("upload-file")


uploadFIle.onchange = e => {
  const file = e.target.files[0]

  /* if (this.files[0].type.indexOf('audio/') !== 0) {
    log.textContent = 'Not an audio file...'
    return;
  } */
  console.log("Uploaded!")
  // myFile ini bisa apa aja sih, yg penting nanti pas mau ngambil filenya pakai myFile juga
  localforage.setItem('myfile', file).then(_ => {
    console.log("uploaded")
  })
}


const recognition = new webkitSpeechRecognition();
recognition.lang = 'id';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');

document.body.onclick = function () {
  console.log('Ready to receive a color command.');
  recognition.start();
}

recognition.onresult = function (event) {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + color;
  bg.style.backgroundColor = color;
}

button.style.display = "block"