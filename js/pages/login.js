console.log("SCRIPT OK");

let responseKaptcha = 0;
let randomNumberKaptcha = document.getElementById("random-number-kaptcha");
let LoginBtn = document.getElementById("login-btn");

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 100);
    responseKaptcha = 0;
    randomNumberKaptcha.innerText = `${x} + ${y} = ?`;
    responseKaptcha += (x + y);
})

LoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    let loginError = document.getElementById("login-error");
    loginError.innerText = "";

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    let katpchaVerification = document.getElementById("kaptcha-verification").value;
    
    let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

    if(Number(katpchaVerification) != responseKaptcha) {
       loginError.innerText += "* Valor KAPTCHA incorreto.\n"
    }

    if(Number(katpchaVerification) == responseKaptcha) {
        usersData.forEach(user => {
            console.log("Início For", user);
            if (user.email == email && user.password == password) {
                console.log("Usuário Conectado");  
                window.open('../pages/dashboard.html', '_blank');
            }
        });
    }

    console.log(usersData);
});