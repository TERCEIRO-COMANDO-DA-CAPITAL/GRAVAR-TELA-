// Carregar publicações do servidor
function carregarPublicacoes() {
    fetch('/publicacoes')
        .then(response => response.json())
        .then(data => {
            const publicacoesLista = document.getElementById('publicacoes-lista');
            publicacoesLista.innerHTML = ''; // Limpa a lista antes de adicionar
            data.forEach(publicacao => {
                const li = document.createElement('li');
                li.classList.add('publicacao');
                li.innerHTML = `
                    <h3>${publicacao.titulo}</h3>
                    <p>${publicacao.texto}</p>
                    <button class="copiar-btn" onclick="copiarTexto('${publicacao.texto}')">Copiar</button>
                    <button class="apagar-btn" onclick="apagarPublicacao(${publicacao.id})">Apagar</button>
                `;
                publicacoesLista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar publicações:', error));
}

// Criar publicação
document.getElementById('criar-publicacao-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;

    const novaPublicacao = {
        id: Date.now(), // Usando timestamp como ID único
        titulo: titulo,
        texto: texto
    };

    fetch('/publicacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaPublicacao)
    })
        .then(response => response.json())
        .then(data => {
            carregarPublicacoes(); // Atualiza a lista de publicações
            document.getElementById('titulo').value = ''; // Limpa o campo de título
            document.getElementById('texto').value = ''; // Limpa o campo de texto
        })
        .catch(error => console.error('Erro ao criar publicação:', error));
});

// Copiar texto
function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado: " + texto);
    }).catch(err => {
        console.error("Erro ao copiar texto: ", err);
    });
}

// Apagar publicação
function apagarPublicacao(id) {
    fetch(`/publicacoes/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                carregarPublicacoes(); // Atualiza a lista de publicações
            } else {
                console.error('Erro ao apagar publicação:', response.statusText);
            }
        })
        .catch(error => console.error('Erro ao apagar publicação:', error));
}

// Inicializa a lista de publicações
carregarPublicacoes();
