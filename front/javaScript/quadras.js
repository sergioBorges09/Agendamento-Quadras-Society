const quadraContainer = document.getElementById("quadraContainer");

function criarCard(quadra) {
    const card = document.createElement("div");
    card.className = "quadra-card";
    card.dataset.nome = quadra.nome;

    card.innerHTML = `
        <img src="${quadra.imagemUrl}" alt="${quadra.nome}">
        <h3>${quadra.nome}</h3>
        <p class="descricao">Quadra disponível para reservas.</p>
        <p class="endereco">Endereço: ${quadra.endereco}</p>
        <p class="valor">Valor: R$ ${quadra.valor.toFixed(2)}/hora</p>
    `;

    card.addEventListener("click", () => {
        window.location.href = "../html/login-cliente.html";
    });

    return card;
}

async function listarQuadras() {
    try {
        const response = await fetch("http://localhost:8080/quadras");
        if (!response.ok) throw new Error("Erro ao buscar quadras");

        const quadras = await response.json();

        quadraContainer.innerHTML = "";
        if (quadras.length === 0) {
            quadraContainer.innerHTML = "<p>Nenhuma quadra cadastrada.</p>";
            return;
        }

        quadras.forEach(q => quadraContainer.appendChild(criarCard(q)));
    } catch (error) {
        console.error("Erro ao buscar quadras:", error);
        quadraContainer.innerHTML = "<p>Não foi possível carregar as quadras. Tente novamente mais tarde.</p>";
    }
}

listarQuadras();
