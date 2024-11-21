import { GerenciadorDeSessao } from "../main.js";

// ------------------ Variáveis de Elementos HTML ------------------
let conta = document.getElementById("conta");
let btnFinanceRegistry = document.getElementById("btn-finance-registry");
let entryRegistration = document.getElementById("entry-registration");
let exitRegistration = document.getElementById("exit-registration");
let balance = document.getElementById("total");
let sessao = GerenciadorDeSessao.restaurarSessao();

if(!sessao.logado) {
    window.location.href = "../entrar/entrar.html";
} else {
    console.log(`Bem-vindo, ${sessao.usuario.nome}`);
}

// ------------------- Classes ------------------
class RegistroFinanceiro {
    /**
     * @param {"entry"|"exit"} tipoOperacao - Tipo da operação: "entry" para entrada ou "exit" para saída.
     * @param {string} nomeOperacao - Nome do registro financeiro.
     * @param {number} valor - Valor do registro (deve ser positivo).
     * @param {string} descricao - Descrição do registro financeiro.
     * @param {string|Date} data - Data do registro (pode ser uma string ou um objeto Date).
     * @param {string|string[]} tags - Tags associadas ao registro (string separada por vírgulas ou array de strings).
     */
    constructor(tipoOperacao, nomeOperacao, valor, descricao, data, tags) {
        this.id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        if (tipoOperacao !== "entry" && tipoOperacao !== "exit") {
            throw new Error("O tipo de operação deve ser 'entry' ou 'exit'.");
        }
        this.tipoOperacao = tipoOperacao;

        this.nomeOperacao = nomeOperacao && nomeOperacao.trim() !== "" ? nomeOperacao : `Registro Anônimo - ${new Date().toLocaleDateString()}`;

        if (isNaN(valor) || valor <= 0) {
            throw new Error("O valor deve ser um número positivo.");
        }
        this.valor = parseFloat(valor);

        this.descricao = descricao && descricao.trim() !== "" ? descricao : "Descrição não informada.";

        if (data instanceof Date) {
            this.data = data;
        } else if (typeof data === "string" && !isNaN(Date.parse(data))) {
            this.data = new Date(data);
        } else {
            this.data = new Date();
        }

        this.tags = Array.isArray(tags) ? tags : tags ? tags.split(",").map(tag => tag.trim()) : [];
    }
}

class PainelRegistroFinanceiro {
    /** 
     * @param {number} total - Variável com o último valor de saldo 
     * @param {HTMLElement} balanceElement - Elemento HTML para inserir o balanço
     * @param {HTMLElement} entryRegistryElement - Elemento HTML para inserir os dados de entrada
     * @param {HTMLElement} exitRegistryElement  - Elemento HTML para inserir os dados de saída
     */
    constructor(total, balanceElement, entryRegistryElement, exitRegistryElement) {
        this.total = total;
        this.balanceElement = balanceElement; 
        this.entryRegistryElement = entryRegistryElement;
        this.exitRegistryElement = exitRegistryElement; 
        this.atualizarSaldo();
    }

    atualizarSaldo() {
        this.balanceElement.textContent = `Saldo Total: R$ ${Number(this.total).toFixed(2)}`;
    }

    /**
     * @param {RegistroFinanceiro} obj - Objeto contendo informações do usuário
     */
    criarRegistroFinanceiro(obj) {
        let { id, tipoOperacao, nomeOperacao, valor, descricao, data, tags } = obj;

        // Validação dos dados
        if (isNaN(valor) || valor <= 0) {
            console.error("Valor inválido:", valor);
            return;
        }

        const divContent = document.createElement("div");
        const h3 = document.createElement("h3");
        const pName = document.createElement("p");
        const pValue = document.createElement("p");
        const pDescription = document.createElement("p");
        const pDate = document.createElement("p");
        const pTags = document.createElement("p");
        const btnDelete = document.createElement("button");

        h3.textContent = `Registro #${id} - ${tipoOperacao === "entry" ? "Entrada" : "Saída"}`;
        pName.textContent = `Nome: ${nomeOperacao}`;
        pValue.textContent = `Valor: R$ ${Number(valor).toFixed(2)}`;
        pDescription.textContent = `Descrição: ${descricao}`;
        pDate.textContent = `Data: ${data}`;
        pTags.textContent = `Tags: ${tags}`;
        btnDelete.textContent = "Remover";

        btnDelete.addEventListener("click", () => {
            divContent.remove(); 
            if (tipoOperacao === "entry") {
                this.total -= valor;
            } else if (tipoOperacao === "exit") {
                this.total += valor;
            }
            this.atualizarSaldo(); 
        });

        divContent.append(h3, pName, pValue, pDescription, pDate, pTags, btnDelete);

        if (tipoOperacao === "entry") {
            this.total += valor;
            this.entryRegistryElement.prepend(divContent); 
        } else if (tipoOperacao === "exit") {
            this.total -= valor;
            this.exitRegistryElement.prepend(divContent); 
        } else {
            console.error("Tipo de operação inválido:", tipoOperacao);
        }

        this.atualizarSaldo();
    }
}

// ------------------- Inicialização de Objetos -------------------
let painelRegistroFinanceiro = new PainelRegistroFinanceiro(0, balance, entryRegistration, exitRegistration);

// ------------------- Eventos -------------------
conta.addEventListener("click", () => {
    sessao.logout();
    window.location.href = "../index.html";
})

btnFinanceRegistry.addEventListener("click", (e) => {
    e.preventDefault();

    let inputRadio = document.getElementById("radio-entry").checked === true ? "entry" : "exit";
    let inputNome = document.getElementById("name-finance-registry").value;
    let inputValor = document.getElementById("value-finance-registry").value;
    let inputDescricao = document.getElementById("description-finance-registry").value;
    let inputData = document.getElementById("date-finance-registry").value;
    let inputTags = document.getElementById("tags-finance-registry").value;

    painelRegistroFinanceiro.criarRegistroFinanceiro(new RegistroFinanceiro(
        inputRadio,
        inputNome,
        inputValor,
        inputDescricao,
        inputData,
        inputTags
    ));
});

document.addEventListener("DOMContentLoaded", () => {
    let bemVindo = document.getElementById("bem-vindo-usuario");
    bemVindo.innerHTML = `${sessao.usuario.nome}, seja bem-vindo!`;
});