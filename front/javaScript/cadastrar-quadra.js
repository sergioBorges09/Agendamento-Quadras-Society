        const form = document.getElementById('formQuadra');
        const msgStatus = document.getElementById('msgStatus');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const endereco = document.getElementById('endereco').value;
            const valor = parseFloat(document.getElementById('valor').value);
            const imagem = document.getElementById('imagem').files[0];

            const formData = new FormData();
            formData.append('imagem', imagem);
            formData.append('dados', new Blob([JSON.stringify({ nome, endereco, valor })], { type: "application/json" }));

            try {
                const response = await fetch('http://localhost:8080/quadras', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    msgStatus.textContent = "Quadra cadastrada com sucesso!";
                    msgStatus.style.color = "green";
                    form.reset();
                } else {
                    msgStatus.textContent = "Erro ao cadastrar quadra. Verifique os dados.";
                    msgStatus.style.color = "red";
                }
            } catch (error) {
                console.error(error);
                msgStatus.textContent = "Erro de conexão com o servidor.";
                msgStatus.style.color = "red";
            }
        });