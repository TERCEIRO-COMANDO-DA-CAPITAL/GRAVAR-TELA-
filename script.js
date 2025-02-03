function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Texto copiado: " + text);
    });
}
