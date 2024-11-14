// Variáveis
const logFinanceRegistry = [];

// Variáveis de Elementos HTML
let btnFinanceRegistry = document.getElementById("btn-finance-registry");
let entryRegistration = document.getElementById("entry-registration");
let exitRegistration = document.getElementById("exit-registration");
let balance = document.querySelector("div.balance h2");
let total = 0;

// Classes
class FinanceRegistry {
    constructor(id, type, name, value, description, date, tags) {
        this.id = id;
        this.type = type;
        this.name = name === "" ? `Regsitro Anônimo - ${new Date().toLocaleDateString()}` : name;
        this.value = value;
        this.description = description === "" ? "Descrição não informada." : description;
        this.date = date === "" ? new Date() : date;
        this.tags = tags;
    }
}

balance.innerHTML = total;

// Eventos
btnFinanceRegistry.addEventListener("click", (e) => {
        e.preventDefault();
    
        let radioFinanceRegistry = document.getElementById("radio-entry").checked === true ? "entry" : "exit";
        let nameFinanceRegistry = document.getElementById("name-finance-registry").value;
        let valueFinanceRegistry = document.getElementById("value-finance-registry").value;
        let descriptionFinanceRegistry = document.getElementById("description-finance-registry").value;
        let dateFinanceRegistry = document.getElementById("date-finance-registry").value;
        let tagsFinanceRegistry = document.getElementById("tags-finance-registry").value;
    
        logFinanceRegistry.push(new FinanceRegistry(
            0,
            radioFinanceRegistry,
            nameFinanceRegistry,
            valueFinanceRegistry,
            descriptionFinanceRegistry,
            dateFinanceRegistry,
            tagsFinanceRegistry
        ));
    
        createFinanceRegistry(0,
            radioFinanceRegistry,
            nameFinanceRegistry,
            valueFinanceRegistry,
            descriptionFinanceRegistry,
            dateFinanceRegistry,
            tagsFinanceRegistry
        );
    
        console.log(logFinanceRegistry);
    }
)

// Functions 
function createFinanceRegistry(id, type, name, value, description, date, tags) {
    let lastFinanceRegistry = document.getElementById("last-finance-registry");
    
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
    h3.textContent = `Registro #${id} - ${type === "entry" ? "Entrada" : "Saída"}`;
    pName.textContent = `Nome: ${name}`;
    pValue.textContent = `Valor: R$ ${value}`;
    pDescription.textContent = `Descrição: ${description}`;
    pDate.textContent = `Data: ${date}`;
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
        total += Number(value);
    } else if (type == "exit") {
        exitRegistration.prepend(lastFinanceRegistry.cloneNode(true));
        total -= Number(value)
    } else {
        console.log(Error("Erro ao Criar Registro"));
    }

    balance.textContent = total;

    console.log(id, type, name, value, description, date, tags);
}

document.addEventListener("DOMContentLoaded", () => {
    let bemVindo = document.getElementById("bem-vindo-usuario");
    bemVindo.innerHTML = `${ null }, seja bem-vindo!`;
})