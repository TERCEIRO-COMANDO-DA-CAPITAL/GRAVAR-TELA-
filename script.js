async function copyText(text) {
    try {
        // Verifica a permissão para escrever na área de transferência
        const permissionStatus = await navigator.permissions.query({ name: "clipboard-write" });

        if (permissionStatus.state === "granted") {
            // Se a permissão for concedida, copia o texto
            await navigator.clipboard.writeText(text);
            showToast(); // Exibe o toast de confirmação
        } else {
            alert("Permissão para acessar a área de transferência negada.");
        }
    } catch (err) {
        console.error("Erro ao copiar texto: ", err);
    }
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.className = "toast show"; // Adiciona a classe para mostrar o toast
    setTimeout(() => {
        toast.className = toast.className.replace("show", ""); // Remove a classe após 3 segundos
    }, 3000);
}
