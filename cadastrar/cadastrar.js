import MinhasFinancasIndexedDB from "../main.js";

let MinhasFinancasDB = new MinhasFinancasIndexedDB();
MinhasFinancasDB.abrirBancoDeDados()

console.log("SCRIPT OK");

// ---------- Variáveis Principais ----------
let responseKaptcha = 0;
let randomNumberKaptcha = document.getElementById("random-number-kaptcha");
let registerBtn = document.getElementById("register-btn");

// ---------- Classes ----------
class Usuario {
    /**
    * @param {string} email - O e-mail do usuário.
    * @param {string} nome - O nome completo do usuário.
    * @param {string} telefone - O número de telefone do usuário.
    * @param {string} questao - A pergunta de segurança do usuário.
    * @param {string} respostaQuestao - A resposta para a pergunta de segurança.
    * @param {string} senha - A senha do usuário.
    */
    constructor(email, nome, telefone, questao, respostaQuestao, senha) {
        this.email = email;
        this.nome = nome;
        this.telefone = telefone;
        this.questao = questao;
        this.respostaQuestao = respostaQuestao;
        this.senha = senha;
        this.receitas = [];
        this.saidas = []
    }
}

// ---------- Eventos ----------
document.addEventListener("DOMContentLoaded", () => {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    
    responseKaptcha = 0;
    randomNumberKaptcha.innerText = `${x} + ${y} = ?\n`;
    responseKaptcha += (x + y);
})

registerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let registerError = document.getElementById("register-error");
    registerError.innerText = "";
    
    let email = document.getElementById("register-email").value;
    let name = document.getElementById("register-name").value;
    let telephone = document.getElementById("register-phone").value;
    let question = document.getElementById("register-question").value;
    let resQuestion = document.getElementById("register-res-question").value;
    let password = document.getElementById("register-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let katpchaVerification = document.getElementById("kaptcha-verification").value;
    
    // Validação básica dos dados
    if(email == "") {
        registerError.innerText += "* Endereço eletrônico inválido.\n"
    }
    if(name == "") {
        registerError.innerText += "* Nome inválido.\n"
    }
    if(telephone == /[a-zA-Z]/i || telephone == "") {
        registerError.innerText += "* Número de telefone inválido.\n"
    }
    if((password != confirmPassword) || (password === "" && confirmPassword === "")) {
        registerError.innerText += "* As senhas não são iguais.\n"
    }
    if(Number(katpchaVerification) != responseKaptcha) {
        registerError.innerText += "* Valor KAPTCHA incorreto.\n"
    }

    // Criação do usuário se todos os dados estiverem corrretos
    if(email != "" && name != "" && telephone != "" && password == confirmPassword && (password != "" && confirmPassword != "") && Number(katpchaVerification) === responseKaptcha) {
        
        MinhasFinancasDB.salvarUsuario(new Usuario(email, name, telephone, question, resQuestion, password));
        registerError.innerText = "Cadastro realizado!";
    }
});