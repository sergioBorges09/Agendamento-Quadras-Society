document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formCadastro = document.getElementById("form-cadastro");

    function limparCPF(cpf) {
        return cpf.replace(/\D/g, "");
    }

    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("http://localhost:8080/clientes/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            if (response.ok) {
                const data = await response.json();

                if (!data.cliente || !data.cliente.id) {
                    alert("Erro no login: dados do cliente inválidos.");
                    return;
                }

                localStorage.setItem("clienteLogado", JSON.stringify(data.cliente));
                localStorage.setItem("token", data.token);

                console.log("Cliente e token salvos corretamente:", data.cliente, data.token);

                window.location.href = "../html/dashboard-cliente.html";
            } else if (response.status === 401) {
                alert("Credenciais inválidas! Verifique seu e-mail e senha.");
            } else {
                alert("Erro no login. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro de conexão com o servidor:", error);
            alert("Erro de conexão com o servidor.");
        }
    });

    formCadastro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email-cadastro").value;
        const telefone = document.getElementById("telefone-contato").value;
        const cpf = limparCPF(document.getElementById("CPF").value);
        const senha = document.getElementById("senha-cadastro").value;

        const dadosCadastro = { nome, email, telefone, cpf, senha };

        try {
            const response = await fetch("http://localhost:8080/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosCadastro)
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso! Agora faça login.");
                formCadastro.reset();
            } else {
                const erro = await response.json().catch(() => null);
                alert("Erro no cadastro: " + (erro?.message || "Verifique os dados"));
            }
        } catch (error) {
            console.error("Erro de conexão com o servidor:", error);
            alert("Erro de conexão com o servidor.");
        }
    });
});
