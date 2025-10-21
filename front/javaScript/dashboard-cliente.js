const BASE_URL = "http://localhost:8080";

const clienteLogado = JSON.parse(localStorage.getItem("clienteLogado"));
const token = localStorage.getItem("token");

if (!clienteLogado || !token) {
  alert("Você precisa fazer login primeiro!");
  window.location.href = "../html/login-cliente.html";
}

const secoes = document.querySelectorAll(".content-section");
const linksMenu = document.querySelectorAll(".menu-item");
const tabelaAgendamentos = document.getElementById("agendamentos-tbody");
const formAgendamento = document.getElementById("form-agendamento");
const selectQuadra = document.getElementById("quadraSelect");

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../html/login-cliente.html";
});

async function fetchComToken(url, options = {}) {
  if (!token) return null;

  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": `Bearer ${token}` 
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      alert("Sessão expirada! Faça login novamente.");
      localStorage.clear();
      window.location.href = "../html/login-cliente.html";
      return null;
    }

    if (response.status === 403) {
      alert("Você não tem permissão para acessar este recurso.");
      return null;
    }

    if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
    return await response.json();

  } catch (erro) {
    console.error("Erro ao fazer requisição:", erro);
    alert("Erro de conexão com o servidor.");
    return null;
  }
}

function mostrarSecao(id) {
  secoes.forEach(secao => secao.style.display = "none");
  document.getElementById(id).style.display = "block";

  linksMenu.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[data-section="${id}"]`)?.classList.add("active");

  if (id === "agendamentos") carregarAgendamentos();
  if (id === "agendar") carregarQuadras();
}

linksMenu.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const alvo = e.target.getAttribute("data-section");
    mostrarSecao(alvo);
  });
});

async function carregarAgendamentos() {
  tabelaAgendamentos.innerHTML = "<tr><td colspan='4' style='text-align:center;'>Carregando...</td></tr>";

  const agendamentos = await fetchComToken(`${BASE_URL}/agendamentos`);
  tabelaAgendamentos.innerHTML = "";

  if (!agendamentos || agendamentos.length === 0) {
    tabelaAgendamentos.innerHTML = "<tr><td colspan='4' style='text-align:center;'>Nenhum agendamento encontrado.</td></tr>";
    return;
  }

  agendamentos.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.quadra?.nome ?? "N/A"}</td>
      <td>${a.data ?? "N/A"}</td>
      <td>${a.horario ?? "N/A"}</td>
      <td>${a.status ?? "Confirmado"}</td>
    `;
    tabelaAgendamentos.appendChild(tr);
  });
}

async function carregarQuadras() {
  selectQuadra.innerHTML = "<option>Carregando quadras...</option>";
  selectQuadra.disabled = true;

  const quadras = await fetchComToken(`${BASE_URL}/quadras`);
  selectQuadra.innerHTML = "";

  if (!quadras || quadras.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "Nenhuma quadra cadastrada.";
    selectQuadra.appendChild(opt);
    selectQuadra.disabled = true;
    return;
  }

  quadras.forEach(q => {
    const opt = document.createElement("option");
    opt.value = q.id ?? "";
    opt.textContent = `${q.nome ?? "Sem nome"} - ${q.tipo ?? "Sem tipo"}`;
    selectQuadra.appendChild(opt);
  });

  selectQuadra.disabled = false;
}

formAgendamento.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    data: document.getElementById("data").value,
    horario: document.getElementById("hora").value,
    quadra: { id: selectQuadra.value } 
  };

  const resultado = await fetchComToken(`${BASE_URL}/agendamentos/cadastrar`, {
    method: "POST",
    body: JSON.stringify(dados)
  });

  if (resultado) {
    alert("Agendamento realizado com sucesso!");
    formAgendamento.reset();
    mostrarSecao("agendamentos");
  }
});

mostrarSecao("agendamentos"); 
