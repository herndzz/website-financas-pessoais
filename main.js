// Este arquivo contém os códigos principais e essenciais para o bom funcionamento da página

// ------------------- IndexedDB -------------------
class MinhasFinancasIndexedDB {
    constructor(dbName = "MinhasFinancasDB", storeName = "Usuarios") {
        this.dbName = dbName;
        this.storeName = storeName;
    }

    // Método para abrir o banco
    async abrirBancoDeDados() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Cria a tabela se não existir
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: "email" }); // "email" como chave primária
                }
            };

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    // Método para salvar (adicionar/atualizar) um usuário
    async salvarUsuario(usuario) {
        const db = await this.abrirBancoDeDados();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.put(usuario); // Adiciona ou atualiza

            request.onsuccess = () => resolve("Usuário salvo com sucesso!");
            request.onerror = () => reject("Erro ao salvar usuário.");
        });
    }

    // Método para buscar um usuário pelo email
    async buscarUsuario(email) {
        const db = await this.abrirBancoDeDados();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.get(email);

            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result);
                } else {
                    reject("Usuário não encontrado.");
                }
            };
            request.onerror = () => reject("Erro ao buscar usuário.");
        });
    }
}

// ------------------- Classes -------------------
class GerenciadorDeSessao {
    constructor() {
        this.usuario = null;
        this.logado = false;
    }

    login(usuario) {
        this.usuario = usuario;
        this.logado = true;

        localStorage.setItem("sessao", JSON.stringify({
            usuario: this.usuario,
            logado: this.logado
        }));
    }

    logout() {
        this.usuario = null;
        this.logado = false;

        // Remover do Local Storage
        localStorage.removeItem("sessao");
    }

    static restaurarSessao() {
        const dadosSessao = localStorage.getItem("sessao");
        if (dadosSessao) {
            const { usuario, logado } = JSON.parse(dadosSessao);
            const sessao = new GerenciadorDeSessao();
            sessao.usuario = usuario;
            sessao.logado = logado;
            return sessao;
        }
        return new GerenciadorDeSessao();
    }
}

// -------------------- Eventos --------------------
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

// document.getElementById("togglePassword").addEventListener("click", function() {
//     const passwordField = document.getElementById("register-password");
//     const icon = this.querySelector("i");
//     if (passwordField.type === "password") {
//         passwordField.type = "text";
//         icon.classList.replace("bi-eye", "bi-eye-slash");
//     } else {
//         passwordField.type = "password";
//         icon.classList.replace("bi-eye-slash", "bi-eye");
//     }
// });

// document.getElementById("toggleConfirmPassword").addEventListener("click", function() {
//     const confirmPasswordField = document.getElementById("confirm-password");
//     const icon = this.querySelector("i");
//     if (confirmPasswordField.type === "password") {
//         confirmPasswordField.type = "text";
//         icon.classList.replace("bi-eye", "bi-eye-slash");
//     } else {
//         confirmPasswordField.type = "password";
//         icon.classList.replace("bi-eye-slash", "bi-eye");
//     }
// });

export { GerenciadorDeSessao, MinhasFinancasIndexedDB };