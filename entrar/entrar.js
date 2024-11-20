import { GerenciadorDeSessao, MinhasFinancasIndexedDB} from "../main.js";

// ---------- Variáveis Principais ----------
let MinhasFinancasDB = new MinhasFinancasIndexedDB();
let responseKaptcha = 0;
let randomNumberKaptcha = document.getElementById("random-number-kaptcha");
let LoginBtn = document.getElementById("login-btn");
let sessao = GerenciadorDeSessao.restaurarSessao();

MinhasFinancasDB.abrirBancoDeDados();

if (sessao.logado) {
    window.location.href = "../painel/painel.html";
}

// ---------- Eventos ----------
document.addEventListener("DOMContentLoaded", () => {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    responseKaptcha = 0;
    randomNumberKaptcha.innerText = `${x} + ${y} = ?`;
    responseKaptcha += (x + y);
})

LoginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    let loginError = document.getElementById("login-error");
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    let katpchaVerification = document.getElementById("kaptcha-verification").value;
    
    loginError.innerText = "";

    if(Number(katpchaVerification) != responseKaptcha) {
        loginError.innerText += "* Valor Kaptcha incorreto.\n";
        return;
    }
    
    // Busca usuário 
    try {
        const usuario = await MinhasFinancasDB.buscarUsuario(email);
        console.log(usuario, usuario.senha)
        
        if (usuario.email === email && usuario.senha === password) {            
            console.log("Login realizado com sucesso!");    
            sessao.login(usuario);        
            window.open('../painel/painel.html', '_blank');
        } else {
            loginError.innerText += "* Email ou senha incorretos.\n";
        }
        
    } catch (erro) {
        loginError.innerText += "* Erro ao buscar usuário. Tente novamente mais tarde.\n";
        console.error(erro);
    }
});