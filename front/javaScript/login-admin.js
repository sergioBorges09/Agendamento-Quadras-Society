const formLogin = document.querySelector(".form-box form:first-of-type");
const formCadastro = document.querySelector(".form-box form:last-of-type");

function limparCPF(cpf) {
    return cpf.replace(/\D/g, "");
}

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/admins/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            const dados = await response.json();
            console.log("✅ Resposta do servidor:", dados);

            if (dados.token) {
                sessionStorage.setItem("token", dados.token);
                sessionStorage.setItem("adminLogado", JSON.stringify(dados.admin));

                alert("Login realizado com sucesso!");
                window.location.href = "dashboard-admin.html";
            } else {
                alert("Erro: token não recebido do servidor.");
            }
        } else {
            const erro = await response.text();
            alert("Erro no login: " + erro);
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    }
});

formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email-cadastro").value.trim();
    const telefone = document.getElementById("telefone-contato").value.trim();
    const cpf = limparCPF(document.getElementById("CPF").value.trim());
    const senha = document.getElementById("senha-cadastro").value.trim();

    if (!nome || !email || !telefone || !cpf || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const dadosCadastro = { nome, email, telefone, cpf, senha };

    try {
        const response = await fetch("http://localhost:8080/admins", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosCadastro)
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            formCadastro.reset();
        } else {
            const erro = await response.text();
            alert("Erro no cadastro: " + erro);
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    }
});
