document.addEventListener("DOMContentLoaded", function() {
    const toggleTheme = document.getElementById("toggleTheme");
    const rootHtml = document.documentElement;

    // Função que altera o tema
    function changeTheme() {
        const currentTheme = rootHtml.getAttribute("data-theme");

        if (currentTheme === "dark") {
            rootHtml.setAttribute("data-theme", "light");
            localStorage.setItem('theme', 'light');
        } else {
            rootHtml.setAttribute("data-theme", "dark");
            localStorage.setItem('theme', 'dark');
        }

        toggleTheme.classList.toggle("bi-sun");
        toggleTheme.classList.toggle("bi-moon-stars");
    }

    // Verifica e aplica o tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        rootHtml.setAttribute("data-theme", savedTheme);
        if (savedTheme === 'dark') {
            toggleTheme.classList.add("bi-sun");
            toggleTheme.classList.remove("bi-moon-stars");
        } else {
            toggleTheme.classList.add("bi-moon-stars");
            toggleTheme.classList.remove("bi-sun");
        }
    }

    // Alterna o tema ao clicar no botão
    toggleTheme.addEventListener("click", changeTheme);
});

document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordField = document.getElementById("register-password");
    const icon = this.querySelector("i");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
    }
});

document.getElementById("toggleConfirmPassword").addEventListener("click", function() {
    const confirmPasswordField = document.getElementById("confirm-password");
    const icon = this.querySelector("i");
    if (confirmPasswordField.type === "password") {
        confirmPasswordField.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        confirmPasswordField.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
    }
});
