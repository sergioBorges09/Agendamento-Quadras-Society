const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const adminValido = admins.find(a => a.usuario === usuario && a.senha === senha);

    if(adminValido){
        mensagem.style.color = "green";
        mensagem.textContent = "Login efetuado com sucesso! Redirecionando...";
        setTimeout(() => {
            window.location.href = "../html/admin-painel.html"; 
        }, 1000);
    } else {
        mensagem.style.color = "red";
        mensagem.textContent = "Usuário ou senha incorretos. Se não estiver cadastrado, entre em contato.";
    }
});
