// Variáveis
const logFinanceRegistry = [];

// Variáveis de Elementos HTML
let btnFinanceRegistry = document.getElementById("btn-finance-registry");

// let btnForm = document.getElementById("btn-form");
// let entryRegistration = document.getElementById("entry-registration");
// let exitRegistration = document.getElementById("exit-registration");
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
})

// Eventos
/*btnForm.addEventListener("click", () => {
    let nameRegistration = document.getElementById("name-registration");
    let valueResgistration = document.getElementById("value-registration");
    let description = document.getElementById("description");
    let operationType = document.getElementById("operation-type");

    createRegistry(nameRegistration.value, valueResgistration.value, description.value, operationType.value);

    balance.innerHTML = total;

    nameRegistration.value = "";
    valueResgistration.value = "";
    description.value = "";

    console.log(nameRegistration, valueResgistration, description, operationType);
});*/

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

    // Adicionando as informações aos elementos
    h3.textContent = `Registro #${id} - ${type === "entry" ? "Entrada" : "Saída"}`;
    pName.textContent = `Nome: ${name}`;
    pValue.textContent = `Valor: R$ ${value}`;
    pDescription.textContent = `Descrição: ${description}`;
    pDate.textContent = `Data: ${date}`;
    pTags.textContent = `Tags: ${tags}`;

    divContent.appendChild(h3);
    divContent.appendChild(pName);
    divContent.appendChild(pValue);
    divContent.appendChild(pDescription);
    divContent.appendChild(pDate);
    divContent.appendChild(pTags);

    div.appendChild(divContent);

    lastFinanceRegistry.prepend(div);

    console.log(id, type, name, value, description, date, tags);
}

function createRegistry(name, value, description, type) {
    let divRegistry = document.createElement("div");
    let titleName = document.createElement("h3");
    let subtitleValue = document.createElement("h4");
    let descriptionRegistry = document.createElement("p");
    let date = document.createElement("p");
    let btnDelete = document.createElement("button");

    divRegistry.id = name;
    divRegistry.className = type;
    divRegistry.className = "registration-box";
    titleName.innerHTML = name != '' ? name : "Registro Não Informado";
    subtitleValue.innerHTML = value != '' ? value : "0";
    descriptionRegistry.innerHTML = description != '' ? description : "Sem descrição.";;
    date.innerHTML = new Date().toLocaleString();
    btnDelete.innerHTML = "Deletar";

    btnDelete.addEventListener("click", () => {
        if (type == "entry") {
            total -= Number(value);
            balance.innerHTML = total;
        } else if (type == "exit") {
            total += Number(value);
            balance.innerHTML = total;
        }
        btnDelete.parentElement.remove();
    })

    divRegistry.appendChild(titleName);
    divRegistry.appendChild(subtitleValue);
    divRegistry.appendChild(descriptionRegistry);
    divRegistry.appendChild(date);
    divRegistry.appendChild(btnDelete);

    if (type == "entry") {
        entryRegistration.prepend(divRegistry);
        total += Number(value);
    } else if (type == "exit") {
        exitRegistration.prepend(divRegistry);
        total -= Number(value)
    } else {
        console.log(Error("Erro ao Criar Registro"));
    }
}