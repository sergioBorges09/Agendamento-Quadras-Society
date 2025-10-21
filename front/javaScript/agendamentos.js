const tbody = document.querySelector("table tbody");

const adminLogado = JSON.parse(sessionStorage.getItem("adminLogado"));

if (!adminLogado) {
    alert("Você precisa estar logado como admin!");
    window.location.href = "../html/login-admin.html";
}

async function carregarAgendamentos() {
    try {
        const response = await fetch("http://localhost:8080/agendamentos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": adminLogado && adminLogado.token ? `Bearer ${adminLogado.token}` : ""
            }
        });

        if (!response.ok) {
            const erro = await response.json().catch(() => ({}));
            alert("Erro ao carregar agendamentos: " + (erro.message || response.statusText));
            return;
        }

        const agendamentos = await response.json();

        if (!Array.isArray(agendamentos)) {
            console.error("Resposta inválida do servidor:", agendamentos);
            alert("Erro ao processar agendamentos.");
            return;
        }

        tbody.innerHTML = ""; 

        agendamentos.forEach(a => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${a.clienteNome || "-"}</td>
                <td>${a.quadraNome || "-"}</td>
                <td>${a.data || "-"}</td>
                <td>${a.hora || "-"}</td>
                <td>${a.valor != null ? a.valor.toFixed(2) : "-"}</td>
                <td>
                    <button onclick="cancelarAgendamento(${a.id})">Cancelar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Erro ao processar agendamentos:", error);
        alert("Erro de conexão com o servidor.");
    }
}

async function cancelarAgendamento(id) {
    if (!confirm("Deseja realmente cancelar este agendamento?")) return;

    try {
        const response = await fetch(`http://localhost:8080/agendamentos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": adminLogado && adminLogado.token ? `Bearer ${adminLogado.token}` : ""
            }
        });

        if (response.ok) {
            alert("Agendamento cancelado com sucesso!");
            carregarAgendamentos();
        } else {
            const erro = await response.json().catch(() => ({}));
            alert("Erro ao cancelar: " + (erro.message || response.statusText));
        }

    } catch (error) {
        console.error("Erro ao cancelar agendamento:", error);
        alert("Erro de conexão com o servidor.");
    }
}

window.addEventListener("DOMContentLoaded", carregarAgendamentos);
