console.log("SCRIPT OK");

let responseKaptcha = 0;
let randomNumberKaptcha = document.getElementById("random-number-kaptcha");
let registerBtn = document.getElementById("register-btn");

let arr = [];

// Modelo para crição de informações do usuário
class User {
    constructor(email, name, telephone, question, responseQuestion, password) {
        this.email = email;
        this.name = name;
        this.telephone = telephone;
        this.question = question;
        this.responseQuestion = responseQuestion;
        this.password = password;
        this.entryFinance = [];
        this.exitFinance = []
    }
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 100);
    responseKaptcha = 0;
    randomNumberKaptcha.innerText = `${x} + ${y} = ?`;
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
        let usersData = JSON.parse(localStorage.getItem("usersData")) || [];
        usersData.push(new User(email, name, telephone, question, resQuestion, password));
        localStorage.setItem("usersData", JSON.stringify(usersData));
        
        arr.unshift(new User(email, name, telephone, question, resQuestion, password));
        registerError.innerText = "Cadastro realizado!";
    }

    console.log({arr, e})
});