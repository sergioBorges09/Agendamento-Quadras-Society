document.addEventListener("DOMContentLoaded", () => {
    const agendamentosTbody = document.getElementById("agendamentos-tbody");
    const quadrasTbody = document.getElementById("quadras-tbody");
    const formQuadra = document.getElementById("formQuadra");
    const msgStatus = document.getElementById("msgStatus");

    const BASE_URL = "http://localhost:8080";

    const token = sessionStorage.getItem("token");
    if (!token) {
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "login-admin.html";
        return;
    }

    window.mostrarSecao = function (secaoId) {
        document.querySelectorAll(".content-section").forEach(secao => {
            secao.style.display = "none";
        });
        const secaoAtiva = document.getElementById(secaoId);
        if (secaoAtiva) secaoAtiva.style.display = "block";
    };

    async function listarAgendamentos() {
        if (!agendamentosTbody) return;
        try {
            const response = await fetch(`${BASE_URL}/agendamentos`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const agendamentos = await response.json();
                agendamentosTbody.innerHTML = "";

                agendamentos.forEach(a => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${a.cliente?.nome || "-"}</td>
                        <td>${a.quadra?.nome || "-"}</td>
                        <td>${a.data || "-"}</td>
                        <td>${a.horario || "-"}</td>
                        <td>R$ ${(a.quadra?.valor ?? 0).toFixed(2)}</td>
                        <td><button data-id="${a.id}" class="btn-excluir">Excluir</button></td>
                    `;
                    agendamentosTbody.appendChild(tr);
                });

                document.querySelectorAll(".btn-excluir").forEach(btn => {
                    btn.addEventListener("click", async (e) => {
                        const id = e.target.dataset.id;
                        if (confirm("Deseja realmente excluir este agendamento?")) {
                            const res = await fetch(`${BASE_URL}/agendamentos/${id}`, {
                                method: "DELETE",
                                headers: { "Authorization": `Bearer ${token}` }
                            });
                            if (res.ok) listarAgendamentos();
                            else alert("Erro ao excluir agendamento.");
                        }
                    });
                });

            } else console.error("Erro ao buscar agendamentos:", response.status);
        } catch (erro) {
            console.error("Erro de conexão:", erro);
        }
    }

    async function listarQuadras() {
        if (!quadrasTbody) return;
        try {
            const response = await fetch(`${BASE_URL}/quadras`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const quadras = await response.json();
                quadrasTbody.innerHTML = "";

                quadras.forEach(q => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${q.nome}</td>
                        <td>${q.endereco}</td>
                        <td>R$ ${(q.valor ?? 0).toFixed(2)}</td>
                        <td><button data-id="${q.id}" class="btn-excluir-quadra">Excluir</button></td>
                    `;
                    quadrasTbody.appendChild(tr);
                });

                document.querySelectorAll(".btn-excluir-quadra").forEach(btn => {
                    btn.addEventListener("click", async (e) => {
                        const id = e.target.dataset.id;
                        if (confirm("Deseja realmente excluir esta quadra?")) {
                            const res = await fetch(`${BASE_URL}/quadras/${id}`, {
                                method: "DELETE",
                                headers: { "Authorization": `Bearer ${token}` }
                            });
                            if (res.ok) listarQuadras();
                            else alert("Erro ao excluir quadra.");
                        }
                    });
                });

            } else console.error("Erro ao buscar quadras:", response.status);
        } catch (erro) {
            console.error("Erro de conexão:", erro);
        }
    }

    if (formQuadra) {
        formQuadra.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(formQuadra);

            try {
                const response = await fetch(`${BASE_URL}/quadras/cadastrar`, {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData
                });

                if (response.ok) {
                    msgStatus.textContent = "Quadra cadastrada com sucesso!";
                    formQuadra.reset();
                    listarQuadras(); 
                } else {
                    const err = await response.json();
                    msgStatus.textContent = `Erro: ${err.message || response.status}`;
                }
            } catch (erro) {
                msgStatus.textContent = `Erro de conexão: ${erro}`;
            }
        });
    }

    listarAgendamentos();
    listarQuadras();
});
