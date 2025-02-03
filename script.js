const video = document.getElementById('video');
let mediaRecorder;
let recordedChunks = [];

// Função para iniciar a captura da tela
async function startCapture() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });
        video.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.onstop = handleStop;
    } catch (err) {
        console.error("Erro ao capturar a tela: ", err);
    }
}

// Função para lidar com os dados gravados
function handleDataAvailable(event) {
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
    }
}

// Função para lidar quando a gravação é parada
function handleStop() {
    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

// Eventos dos botões
document.getElementById('start').addEventListener('click', () => {
    startCapture();
    mediaRecorder.start();
});

document.getElementById('stop').addEventListener('click', () => {
    mediaRecorder.stop();
});
