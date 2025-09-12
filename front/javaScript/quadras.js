const modal = document.getElementById("modalReserva");
const closeBtn = document.querySelector(".close");
const quadraInput = document.getElementById("quadra");
const quadraSelecionada = document.getElementById("quadraSelecionada");

const quadrasInfo = [
    {
        descricao: "Perfeita para jogos rápidos e lazer com amigos.",
        endereco: "Rua das Palmeiras, 123",
        valor: "R$ 80,00/hora"
    },
    {
        descricao: "Ambiente tranquilo e agradável para toda família.",
        endereco: "Av. das Flores, 456",
        valor: "R$ 70,00/hora"
    },
    {
        descricao: "Quadra com linda vista para o lago, ideal para treinos.",
        endereco: "Rua do Lago, 789",
        valor: "R$ 90,00/hora"
    },
    {
        descricao: "Área verde e cercada de oliveiras, ambiente acolhedor.",
        endereco: "Rua das Oliveiras, 101",
        valor: "R$ 75,00/hora"
    },
    {
        descricao: "Quadra espaçosa perfeita para torneios e eventos.",
        endereco: "Av. dos Ipês, 202",
        valor: "R$ 85,00/hora"
    },
    {
        descricao: "Local ensolarado, ótima para jogos ao final da tarde.",
        endereco: "Rua do Sol Nascente, 303",
        valor: "R$ 80,00/hora"
    },
    {
        descricao: "Quadra próxima à fonte, ambiente calmo e seguro.",
        endereco: "Rua da Fonte, 404",
        valor: "R$ 70,00/hora"
    },
    {
        descricao: "Ótima estrutura, iluminada e perfeita para jogos noturnos.",
        endereco: "Rua das Estrelas, 505",
        valor: "R$ 95,00/hora"
    }
];

document.querySelectorAll(".quadra-card").forEach((card, index) => {
    const info = quadrasInfo[index];
    card.querySelector(".descricao").textContent = info.descricao;
    card.querySelector(".endereco").textContent = `Endereço: ${info.endereco}`;
    card.querySelector(".valor").textContent = `Valor: ${info.valor}`;

    card.addEventListener("click", () => {
        const nome = card.getAttribute("data-nome");
        quadraSelecionada.textContent = `Reserva - ${nome}`;
        quadraInput.value = nome;
        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});
