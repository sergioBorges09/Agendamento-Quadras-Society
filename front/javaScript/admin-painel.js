const agendamentos = [
    {id: 1, usuario: "João", quadra: "1", data: "2025-09-12", hora: "18:00"},
    {id: 2, usuario: "Maria", quadra: "2", data: "2025-09-12", hora: "19:00"}
];

const agendamentosBody = document.getElementById("agendamentosBody");
const formHorario = document.getElementById("formHorario");

function carregarTabela() {
    agendamentosBody.innerHTML = "";
    agendamentos.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${a.usuario}</td>
            <td>${a.quadra}</td>
            <td>${a.data}</td>
            <td>${a.hora}</td>
            <td>
                <button class="btn-editar" onclick="editarAgendamento(${a.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirAgendamento(${a.id})">Excluir</button>
            </td>
        `;
        agendamentosBody.appendChild(tr);
    });
}

function editarAgendamento(id) {
    const agendamento = agendamentos.find(a => a.id === id);
    const novoUsuario = prompt("Editar usuário:", agendamento.usuario);
    if (novoUsuario) {
        agendamento.usuario = novoUsuario;
        carregarTabela();
    }
}

function excluirAgendamento(id) {
    if(confirm("Deseja realmente excluir este agendamento?")) {
        const index = agendamentos.findIndex(a => a.id === id);
        agendamentos.splice(index, 1);
        carregarTabela();
    }
}

formHorario.addEventListener("submit", function(e){
    e.preventDefault();
    const quadra = document.getElementById("quadra").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    const novoHorario = {
        id: agendamentos.length + 1,
        usuario: "-",
        quadra,
        data,
        hora
    };
    agendamentos.push(novoHorario);
    carregarTabela();
    formHorario.reset();
});

document.getElementById("btnSair").addEventListener("click", function(){
    window.location.href = "../html/admin-login.html";
});

carregarTabela();
