const formCadastro = document.getElementById('form-cadastro');
const tabelaAdmin = document.querySelector('#tabela-admin tbody');
const formLogin = document.getElementById('form-login');

// Função para atualizar tabela
function atualizarTabela() {
    tabelaAdmin.innerHTML = "";
    const admins = JSON.parse(localStorage.getItem('admins')) || [];

    admins.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${a.nome}</td>
            <td>${a.email}</td>
            <td>${a.telefone}</td>
            <td>${a.logradouro}</td>
            <td>${a.bairro}</td>
            <td>${a.cep}</td>
            <td>${a.numero || ''}</td>
            <td>${a.complemento || ''}</td>
            <td>${a.cidade}</td>
            <td>${a.uf}</td>
        `;
        tabelaAdmin.appendChild(tr);
    });
}

formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const admin = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email-cadastro').value,
        telefone: document.getElementById('telefone').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cep: document.getElementById('cep').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        senha: document.getElementById('senha-cadastro').value
    };

    let admins = JSON.parse(localStorage.getItem('admins')) || [];

    const existe = admins.some(a => a.email === admin.email);
    if (existe) {
        alert("E-mail já cadastrado!");
        return;
    }

    admins.push(admin);
    localStorage.setItem('admins', JSON.stringify(admins));

    alert("Administrador cadastrado com sucesso!");
    formCadastro.reset();
    atualizarTabela();
});

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const adminValido = admins.find(a => a.email === email && a.senha === senha);

    if (adminValido) {
        alert(`Bem-vindo, ${adminValido.nome}!`);
        formLogin.reset();
    } else {
        alert("E-mail ou senha incorretos!");
    }
});

document.addEventListener('DOMContentLoaded', atualizarTabela);
