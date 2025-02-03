function criarPublicacao(event) {
    event.preventDefault(); // Impede o envio do formulário

    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;

    if (titulo && texto) {
        // Cria um novo objeto de publicação
        const novaPublicacao = {
            id: Date.now(), // Usando timestamp como ID único
            titulo: titulo,
            texto: texto
        };

        // Adiciona a nova publicação à lista
        const publicacoesLista = document.getElementById('publicacoes-lista');
        const li = document.createElement('li');
        li.classList.add('publicacao');
        li.innerHTML = `
            <h3>${novaPublicacao.titulo}</h3>
            <p>${novaPublicacao.texto}</p>
            <button class="copiar-btn" onclick="copiarTexto('${novaPublicacao.texto}')">Copiar</button>
            <button class="apagar-btn" onclick="apagarPublicacao(${novaPublicacao.id})">Apagar</button>
        `;
        publicacoesLista.appendChild(li);

        // Limpa os campos do formulário
        document.getElementById('titulo').value = '';
        document.getElementById('texto').value = '';
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado: " + texto);
    }).catch(err => {
        console.error("Erro ao copiar texto: ", err);
    });
}

function apagarPublicacao(id) {
    const publicacoesLista = document.getElementById('publicacoes-lista');
    const publicacao = Array.from(publicacoesLista.children).find(li => {
        return li.querySelector('button.apagar-btn').onclick.toString().includes(id);
    });

    if (publicacao) {
        publicacoesLista.removeChild(publicacao);
    }
}
