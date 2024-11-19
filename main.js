// Este arquivo contém os códigos principais e essenciais para o bom funcionamento da página

// ---------- IndexedDB ----------
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

// ---------- Classes ----------
class PainelRegistroFinanceiro {
    constructor(total) {
        this.total = total;
    }

    criarRegistroFinanceiro(id, tipoOperacao, nomeOperacao, valor, descricao, data, tags, idHTML) {
        let lastFinanceRegistry = document.getElementById(idHTML);
        
        // Armazenando a criação de elementos HTML em variáveis
        let div = document.createElement("div");
        let divContent = document.createElement("div");
        let h3 = document.createElement("h3");
        let pName = document.createElement("p");
        let pValue = document.createElement("p");
        let pDescription = document.createElement("p");
        let pDate = document.createElement("p");
        let pTags = document.createElement("p");
        let btnDelete = document.createElement("button");
    
        // Adicionando as informações aos elementos
        h3.textContent = `Registro #${id} - ${tipoOperacao === "entry" ? "Entrada" : "Saída"}`;
        pName.textContent = `Nome: ${nomeOperacao}`;
        pValue.textContent = `Valor: R$ ${valor}`;
        pDescription.textContent = `Descrição: ${descricao}`;
        pDate.textContent = `Data: ${data}`;
        pTags.textContent = `Tags: ${tags}`;
        btnDelete.textContent = "Remover";
    
        divContent.appendChild(h3);
        divContent.appendChild(pName);
        divContent.appendChild(pValue);
        divContent.appendChild(pDescription);
        divContent.appendChild(pDate);
        divContent.appendChild(pTags);
        divContent.appendChild(btnDelete);
    
        // Função do botão de remover
        btnDelete.addEventListener("click", () => {
            if (type == "entry") {
                total -= Number(value);
                balance.textContent = total;
            } else if (type == "exit") {
                total += Number(value);
                balance.textContent = total;
            }
            btnDelete.parentElement.remove();
        })
    
        div.appendChild(divContent);
    
        lastFinanceRegistry.prepend(div);
    
        if (type == "entry") {
            entryRegistration.prepend(lastFinanceRegistry.cloneNode(true));
            total += Number(valor);
        } else if (type == "exit") {
            exitRegistration.prepend(lastFinanceRegistry.cloneNode(true));
            total -= Number(valor)
        } else {
            console.log(Error("Erro ao Criar Registro"));
        }
    
        balance.textContent = total;
    
        console.log(id, tipoOperacao, nomeOperacao, valor, descricao, data, tags, idHTML);
    }
}

/**
 * Gerenciamento do estado de login do usuário.
 */
class ControladorDeLogin {
    constructor() {
        /**
         * Mostra se um usuário está logado.
         * @type {boolean}
         */
        this.usuarioLogado = false;
        
        /**
         * Mostra os dados do usuário logado atual.
         * @type {Object|null}
         */
        this.usuario = null;

    }

    usuarioEntrou() {
        this.usuarioLogado = true;
    }

    usuarioSaiu() {
        this.usuarioLogado = false;
    }

    /**
    * @param {Object} usr - Objeto contendo os dados do usuário.
    */
    usuarioAtual(usr) {
        this.usuario = usr;
    }
}

// ---------- Armazenamento Local ----------
if(!localStorage.getItem("ControladorDeLogin")) {
    localStorage.setItem("ControladorDeLogin", JSON.stringify(new ControladorDeLogin));
}

// ---------- Eventos ----------
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

export default MinhasFinancasIndexedDB;